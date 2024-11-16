// getTokens.js
import axios from 'axios';
import open from 'open';
import * as http from 'http'; //ES 6
import * as url from "url";
import * as querystring from "querystring";

// Replace with your credentials
const CLIENT_ID = '207819093641-ot03in5gj1v2i6np5rov4o5jq5qdetl5.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

// Scope for read-only access to Google Photos
const SCOPE = 'https://www.googleapis.com/auth/photoslibrary.readonly';

// Step 1: Get authorization code
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline',
    prompt: 'consent',
})}`;

console.log('Opening browser for authentication...');
open(authUrl);

// Create a simple server to receive the callback
const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/oauth2callback')) {
        const query = url.parse(req.url, true).query;
        const code = query.code;
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Authentication successful! You can close this window.');
        server.close();

        // Step 2: Exchange authorization code for tokens
        try {
            const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
                params: {
                    code: code,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    redirect_uri: REDIRECT_URI,
                    grant_type: 'authorization_code',
                },
            });

            const { access_token, refresh_token, expires_in } = tokenResponse.data;

            console.log('Access Token:', access_token);
            console.log('Refresh Token:', refresh_token);
            console.log('Expires In:', expires_in, 'seconds');

            // Save tokens securely
            // For demonstration, we're just printing them
            // In production, store them in environment variables or a secure vault
        } catch (error) {
            console.error('Error fetching tokens:', error.response.data);
        }
    }
});

server.listen(3000, () => {
    console.log('Listening on http://localhost:3000 for OAuth callback...');
});