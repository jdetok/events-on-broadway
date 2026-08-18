// use the gmail oauth client id and secret in the .env to generate a token.json with refresh_token

import { google } from 'googleapis';
import dotenv from 'dotenv';
import http from 'http';
import url from 'url';
import open from 'open'; // npm install open
import fs from 'fs';

dotenv.config();

const CLIENT_ID = process.env.EOB_CLIENT_ID;
const CLIENT_SECRET = process.env.EOB_KEY;
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // REQUIRED to get a refresh_token
    prompt: 'consent',      // REQUIRED — forces Google to re-issue refresh_token even if you've authorized before
    scope: ['https://www.googleapis.com/auth/gmail.send'],
});

console.log('Open this URL in your browser (logged in as the sending account):\n', authUrl);
open(authUrl);

const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/oauth2callback')) {
        const qs = new url.URL(req.url, REDIRECT_URI).searchParams;
        const code = qs.get('code');
        res.end('Success! You can close this tab.');
        server.close();
        
        const { tokens } = await oAuth2Client.getToken(code);
        fs.writeFileSync('token.json', JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            ...tokens,
        }, null, 2));
        console.log('Saved token.json:', tokens);
        process.exit(0);
    }
});

server.listen(3000, () => console.log('Waiting for OAuth callback on port 3000...'));
