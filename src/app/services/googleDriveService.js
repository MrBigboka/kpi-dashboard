import { google } from 'googleapis';
import { ReadStream } from 'fs';
require('dotenv').config(); // Charger les variables d'environnement

const auth = new google.auth.GoogleAuth({
    credentials: {
        type: "service_account",
        project_id: process.env.GOOGLE_PROJECT_ID,
        private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        client_id: process.env.GOOGLE_CLIENT_ID,
        auth_uri: process.env.GOOGLE_AUTH_URI,
        token_uri: process.env.GOOGLE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
        client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
    },
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

export const uploadFileToGoogleDrive = async (
    fileName,
    fileStream
) => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: ['1a7cQO5FuI3wdyBJQIIRm8no5OJGdj_QD'], // Utilisez ici l'ID du dossier partagé
                mimeType: 'application/octet-stream',
            },
            media: {
                mimeType: 'application/octet-stream',
                body: fileStream,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors du téléchargement sur Google Drive:', error);
        throw error;
    }
};
