// pages/api/uploadToGoogleDrive.js

import { google } from "googleapis";
import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Méthode non autorisée" });
    }

    try {
        const { fields, files } = await parseForm(req);
        console.log("Champs reçus:", fields);
        console.log("Fichiers reçus:", JSON.stringify(files, null, 2));

        const file = Array.isArray(files.file) ? files.file[0] : files.file;

        if (!file) {
            console.error("Aucun fichier trouvé dans la requête");
            return res
                .status(400)
                .json({ error: "Aucun fichier trouvé dans la requête" });
        }

        if (!file.filepath) {
            console.error("Filepath manquant pour le fichier");
            return res
                .status(400)
                .json({ error: "Filepath manquant pour le fichier" });
        }

        console.log("Chemin du fichier:", file.filepath);
        console.log("Taille du fichier:", file.size);
        console.log("Type MIME du fichier:", file.mimetype);

        await checkFileReadable(file.filepath);

        const fileId = await uploadToDrive(file);

        console.log(
            "Fichier téléchargé avec succès sur Google Drive, ID:",
            fileId
        );
        return res.status(200).json({ fileId });
    } catch (error) {
        console.error("Erreur dans le handler:", error);
        return res
            .status(500)
            .json({ error: error.message || "Erreur interne du serveur" });
    }
}

function parseForm(req) {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: false });
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error("Erreur lors du parsing du formulaire:", err);
                reject(err);
            } else {
                console.log("Formulaire parsé avec succès");
                resolve({ fields, files });
            }
        });
    });
}

async function checkFileReadable(filepath) {
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.constants.R_OK, (err) => {
            if (err) {
                console.error(
                    "Le fichier n'est pas lisible ou n'existe pas:",
                    err
                );
                reject(
                    new Error("Le fichier n'est pas lisible ou n'existe pas")
                );
            } else {
                console.log("Le fichier est lisible:", filepath);
                resolve();
            }
        });
    });
}

async function uploadToDrive(file) {
    const SERVICE_ACCOUNT_KEY_PATH = path.join(
        process.cwd(),
        "config",
        "service-account-key.json"
    );
    console.log(
        "Chemin du fichier de clé de service:",
        SERVICE_ACCOUNT_KEY_PATH
    );

    await checkFileReadable(SERVICE_ACCOUNT_KEY_PATH);

    const auth = new google.auth.GoogleAuth({
        keyFile: SERVICE_ACCOUNT_KEY_PATH,
        scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driveService = google.drive({ version: "v3", auth });

    const fileMetadata = {
        name: file.originalFilename,
        parents: ["1a7cQO5FuI3wdyBJQIIRm8no5OJGdj_QD"], // Remplacez par l'ID de votre dossier
    };

    const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.filepath),
    };

    try {
        console.log("Début de l'upload vers Google Drive");
        const response = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: "id, name, parents",
        });
        console.log("Upload vers Google Drive réussi");
        console.log("Métadonnées du fichier:", response.data);
        return response.data.id;
    } catch (error) {
        console.error("Erreur lors de l'upload vers Google Drive:", error);
        throw new Error("Erreur lors de l'upload vers Google Drive");
    }
}
