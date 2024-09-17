"use client";

import { useAuth } from "./context/AuthContext";
import DashboardPage from "./home/DashboardPage";
import Sidebar from "./home/Sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const { currentUser, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !currentUser) {
            // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
            router.push("/login");
        }
    }, [currentUser, loading, router]);

    if (loading || !currentUser) {
        return <p>Chargement...</p>; // Afficher un indicateur de chargement pendant la vérification
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow">
                    <DashboardPage />
                </div>
            </div>
            <footer className="w-full bg-zinc-900 text-center p-4 text-white">
                <p>
                    © 2024 SmartScaling | Tableau de bord - Tous droits réservés
                </p>
            </footer>
        </div>
    );
}
