import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function loginWithUsername(username, password) {
    try {
        console.log("Recherche du nom d'utilisateur:", username); // Ajoute cette ligne pour vérifier ce qui est envoyé à Firestore

        // Rechercher l'e-mail correspondant au nom d'utilisateur dans Firestore
        const usersRef = collection(db, "users");
        const q = query(
            usersRef,
            where("username", "==", username.toLowerCase())
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("Nom d'utilisateur non trouvé");
            throw new Error("Nom d'utilisateur non trouvé");
        }

        // Récupérer l'e-mail associé au nom d'utilisateur
        const userData = querySnapshot.docs[0].data();
        const email = userData.email;

        console.log("Email trouvé:", email); // Ajoute cette ligne pour vérifier si l'e-mail est bien récupéré

        // Authentifier l'utilisateur avec l'email et le mot de passe
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Connexion réussie");
    } catch (error) {
        console.error("Erreur lors de la connexion:", error.message);
        throw new Error("Erreur lors de la connexion.");
    }
}
