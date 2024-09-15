import { google } from "googleapis";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

async function listFilesFromFolder(folderId) {
    const SERVICE_ACCOUNT_KEY_PATH = path.join(
        process.cwd(),
        "config",
        "service-account-key.json"
    );

    const auth = new google.auth.GoogleAuth({
        keyFile: SERVICE_ACCOUNT_KEY_PATH,
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
