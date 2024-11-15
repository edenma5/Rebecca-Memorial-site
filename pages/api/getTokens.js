// getTokens.js
import axios from 'axios';
import open from 'open';
import * as http from 'http'; //ES 6
import * as url from "url";
import * as querystring from "querystring";

// Step 1: Get authorization code
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${querystring.stringify({
    client_id: process.env.CLIENT_ID,
    redirect_uri: process.env.REDIRECT_URI,
    response_type: 'code',
    scope: process.env.SCOPE,
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
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    redirect_uri: process.env.REDIRECT_URI,
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