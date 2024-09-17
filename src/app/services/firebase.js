// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Importer Auth pour l'authentification
import { getFirestore } from "firebase/firestore"; // Importer Firestore pour la base de données

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoCYRHWxW3LjUn1jYrjqk0puXh2rsGugw",
    authDomain: "kpi-dashboard-c57ce.firebaseapp.com",
    projectId: "kpi-dashboard-c57ce",
    storageBucket: "kpi-dashboard-c57ce.appspot.com",
    messagingSenderId: "430031400031",
    appId: "1:430031400031:web:a6d3914e43a331c26ebfea",
    measurementId: "G-GNJ1296F69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialisation de l'authentification
const db = getFirestore(app); // Initialisation de Firestore

export { app, auth, db, analytics };
