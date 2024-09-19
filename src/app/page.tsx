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
            router.push("/login");
        }
    }, [currentUser, loading, router]);

    if (loading) {
        return <p>Chargement...</p>; // Afficher un indicateur de chargement pendant la vérification
    }

    if (!currentUser) {
        return null; // Ne rien rendre tant que `currentUser` n'est pas vérifié
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow">
                    <DashboardPage />
                </div>
            </div>
            <footer className="relative z-10 w-full bg-zinc-900 text-center p-4 text-white mt-auto">
                <p className="text-sm sm:text-base">
                    © 2024 SmartScaling | Tableau de bord - Tous droits réservés
                </p>
            </footer>
        </div>
    );
}
