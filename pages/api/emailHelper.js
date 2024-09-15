import nodemailer from 'nodemailer';

const sendEmailHelper = async ({ contactType, contactTitle, contactBody, userEmail }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "mail.privateemail.com", // Serveur SMTP de privateemail
            port: 587, // Utilisez 465 pour SSL ou 587 pour TLS
            secure: false, // true pour SSL (port 465), false pour TLS (port 587)
            auth: {
                user: process.env.SMTP_USER, // Informations d'authentification tirées du fichier .env
                pass: process.env.SMTP_PASS, // Informations d'authentification tirées du fichier .env
            },
        });

        const mailOptions = {
            from: userEmail || '"Contact SmartScaling" <contact@smartscaling.ca>', // L'expéditeur du mail
            to: "contact@smartscaling.ca", // Le destinataire du mail
            subject: `Nouvelle demande: ${contactTitle}`, // Objet de l'email
            text: `Type de demande: ${contactType}\n\n${contactBody}\n\nEmail de l'utilisateur : ${userEmail || 'Non fourni'}`, // Contenu de l'email
        };

        await transporter.sendMail(mailOptions);
        console.log("E-mail envoyé avec succès");
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        throw new Error("Erreur lors de l'envoi de l'e-mail");
    }
};

export default sendEmailHelper;
