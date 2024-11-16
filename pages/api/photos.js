// pages/api/photos.js
import axios from 'axios';

export default async function handler(req, res) {
    const getAccessToken = async () => {
        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', null, {
                params: {
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    refresh_token: process.env.REFRESH_TOKEN,
                    grant_type: 'refresh_token',
                },
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Error refreshing access token:', error.response?.data || error.message);
            throw new Error('Failed to refresh access token');
        }
    };

    try {
        const accessToken = await getAccessToken();

        // Replace 'YOUR_ALBUM_ID' with your actual album ID obtained from the previous step
        const albumId = process.env.ALBUM_ID;

        // Using mediaItems.search to fetch items from a specific album
        const response = await axios.post(
            'https://photoslibrary.googleapis.com/v1/mediaItems:search',
            {
                albumId: albumId,
                pageSize: 100, // Adjust as needed
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const mediaItems = response.data.mediaItems || [];

        // Extract necessary information (e.g., baseUrl)
        const photos = mediaItems.map((item) => ({
            id: item.id,
            filename: item.filename,
            baseUrl: item.baseUrl,
            mimeType: item.mimeType,
            mediaMetadata: item.mediaMetadata,
        }));

        res.status(200).json({ photos });
    } catch (error) {
        console.error('Error fetching photos:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
}