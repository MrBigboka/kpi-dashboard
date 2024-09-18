import { google } from 'googleapis';
import formidable from 'formidable';
import fs from 'fs';
import serviceAccount from '../../config/googleConfig';

export const config = {
    api: {
        bodyParser: false, // Désactive le body parser par défaut pour utiliser formidable
    },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Méthode non autorisée' });
    }

    try {
        const { fields, files } = await parseForm(req);
        console.log('Champs reçus:', fields);
        console.log('Fichiers reçus:', JSON.stringify(files, null, 2));

        const file = Array.isArray(files.file) ? files.file[0] : files.file;

        if (!file) {
            return res.status(400).json({ error: 'Aucun fichier trouvé dans la requête' });
        }

        await checkFileReadable(file.filepath);

        const fileId = await uploadToDrive(file);

        return res.status(200).json({ fileId });
    } catch (error) {
        console.error('Erreur dans le handler:', error);
        return res.status(500).json({ error: error.message || 'Erreur interne du serveur' });
    }
}

// Fonction pour parser le formulaire avec formidable
function parseForm(req) {
    return new Promise((resolve, reject) => {
        const form = formidable({ multiples: false });
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err);
            } else {
                resolve({ fields, files });
            }
        });
    });
}

// Vérifier si le fichier est lisible
async function checkFileReadable(filepath) {
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.constants.R_OK, (err) => {
            if (err) {
                reject(new Error("Le fichier n'est pas lisible ou n'existe pas"));
            } else {
                resolve();
            }
        });
    });
}

// Fonction pour uploader le fichier vers Google Drive
async function uploadToDrive(file) {
    const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

    const auth = new google.auth.GoogleAuth({
        credentials: serviceAccount,  // Utilisation des credentials via dotenv
        scopes: SCOPES,
    });

    const driveService = google.drive({ version: 'v3', auth });

    const fileMetadata = {
        name: file.originalFilename,
        parents: ['1a7cQO5FuI3wdyBJQIIRm8no5OJGdj_QD'], // Remplacer par l'ID de votre dossier Drive
    };

    const media = {
        mimeType: file.mimetype,
        body: fs.createReadStream(file.filepath),
    };

    try {
        const response = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id, name, parents',
        });
        return response.data.id;
    } catch (error) {
        console.error('Erreur lors de l\'upload vers Google Drive:', error);
        throw new Error('Erreur lors de l\'upload vers Google Drive');
    }
}
