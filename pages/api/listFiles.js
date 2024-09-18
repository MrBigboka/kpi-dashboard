import { google } from "googleapis";

export const config = {
    api: {
        bodyParser: false,
    },
};

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

async function listFilesFromFolder(folderId) {
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
        scopes: SCOPES,
    });

    const driveService = google.drive({ version: "v3", auth });

    try {
        const response = await driveService.files.list({
            q: `'${folderId}' in parents`, // Utiliser l'ID du dossier ici
            fields: "files(id, name, mimeType, size, modifiedTime)",
        });

        return response.data.files;
    } catch (error) {
        console.error("Erreur lors de la récupération des fichiers:", error);
        throw new Error(
            "Erreur lors de la récupération des fichiers depuis Google Drive"
        );
    }
}

export default async function handler(req, res) {
    if (req.method !== "GET") {
        return res.status(405).json({ message: "Méthode non autorisée" });
    }

    const folderId = "1a7cQO5FuI3wdyBJQIIRm8no5OJGdj_QD"; // Utilisez votre ID de dossier ici

    try {
        const files = await listFilesFromFolder(folderId);
        res.status(200).json({ files });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
