import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Assure-toi d'importer auth et db correctement

export async function createAccount(username, email, password) {
    try {
        // Créer un compte utilisateur avec Firebase Auth (email et mot de passe)
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;

        // Sauvegarder le nom d'utilisateur dans Firestore
        await setDoc(doc(db, "users", user.uid), {
            username: username, // Nom d'utilisateur choisi manuellement
            email: email, // Email associé au compte Firebase
        });

        console.log("Utilisateur créé avec succès");
    } catch (error) {
        console.error("Erreur lors de la création du compte : ", error.message);
    }
}
