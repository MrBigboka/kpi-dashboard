// googleDriveService.ts
import { google } from "googleapis";
import { ReadStream } from "fs";
import path from "path";

const SERVICE_ACCOUNT_KEY_PATH = path.join(
    __dirname,
    "../../config/service-account-key.json"
);

const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY_PATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

export const uploadFileToGoogleDrive = async (
    fileName: string,
    fileStream: ReadStream
) => {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: fileName,
                parents: ["1a7cQO5FuI3wdyBJQIIRm8no5OJGdj_QD"], // Utilisez ici l'ID du dossier partagé
                mimeType: "application/octet-stream",
            },
            media: {
                mimeType: "application/octet-stream",
                body: fileStream,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors du téléchargement sur Google Drive:", error);
        throw error;
    }
};
