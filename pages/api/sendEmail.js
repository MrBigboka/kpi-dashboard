import sendEmailHelper  from "./emailHelper";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { contactType, contactTitle, contactBody, userEmail } = req.body;

        try {
            // Log pour vérifier les données avant envoi
            console.log("Données reçues:", { contactType, contactTitle, contactBody, userEmail });

            // Appeler la fonction sendEmailHelper avec les données du formulaire
            await sendEmailHelper({
                contactType,
                contactTitle,
                contactBody,
                userEmail,
            });

            res.status(200).json({ message: "Email envoyé avec succès" });
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'email :", error);  // Log de l'erreur
            res.status(500).json({ message: "Erreur lors de l'envoi de l'email", error: error.message });
        }
    } else {
        res.status(405).json({ message: "Méthode non autorisée" });
    }
}