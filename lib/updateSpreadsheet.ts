import { google } from 'googleapis';
import { readFileSync } from 'fs';
import { join } from 'path';

const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SERVICE_ACCOUNT_KEY_PATH = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

if (!SPREADSHEET_ID || !SERVICE_ACCOUNT_KEY_PATH) {
    throw new Error('Missing required environment variables');
}

const keys = JSON.parse(readFileSync(join(process.cwd(), SERVICE_ACCOUNT_KEY_PATH), 'utf-8'));

async function updateSpreadsheet(totalUsers: number): Promise<void> {
    const client = new google.auth.JWT(
        keys.client_email,
        undefined,
        keys.private_key,
        ['https://www.googleapis.com/auth/spreadsheets']
    );

    const sheets = google.sheets({ version: 'v4', auth: client });

    const request = {
        spreadsheetId: SPREADSHEET_ID,
        range: 'Sheet1!H12',
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [[totalUsers]]
        }
    };

    try {
        const response = await sheets.spreadsheets.values.update(request);
        console.log('Spreadsheet updated successfully:', response);
    } catch (error) {
        console.error('Error updating spreadsheet:', error);
    }
}

export default updateSpreadsheet;
