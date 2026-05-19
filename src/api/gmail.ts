import { google } from 'googleapis';
import fs from 'node:fs/promises';
import path from 'node:path';

const credentials = JSON.parse((await fs.readFile(path.join(process.cwd(), 'token.json'))).toString());

const auth = new google.auth.OAuth2(credentials.client_id, credentials.client_secret);
auth.setCredentials({ refresh_token: credentials.refresh_token });

const gmail = google.gmail({ version: 'v1', auth });

export async function sendEmail(to: string, subject: string, body: string) {
    const message = [
        `To: ${to}`,
        `Subject: ${subject}`,
        'Content-Type: text/plain; charset=utf-8',
        '',
        body,
    ].join('\n');

    const encoded = Buffer.from(message).toString('base64url');

    return await gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw: encoded }
    });
}
