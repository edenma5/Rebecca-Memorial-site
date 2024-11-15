// pages/api/photos.js
import axios from 'axios';

export default async function handler(req, res) {
    const getAccessToken = async () => {
        try {
            const response = await axios.post('https://oauth2.googleapis.com/token', null, {
                params: {
                    client_id: '207819093641-bsebggbrcr7ahiijk0celunnn4kcfick.apps.googleusercontent.com',
                    client_secret: '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',
                    refresh_token: '1//03lQeifa88vBdCgYIARAAGAMSNwF-L9IruDU47UMhS-B0-tTDaU_xlMAi227p9W5qyXBvM26A9guIOlq2O0SoGw1i8MxTXaUvC5w',
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
        const albumId = 'AK-VX93If-pdvfU2B2pk037i0MvafAwMkMKotES71UzkARR1yt1owtnmKkz9D-CsHw37h6aJ74dQ';

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