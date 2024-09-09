import DashboardPage from "./home/DashboardPage";
import Sidebar from "./home/Sidebar";

export default function Home() {
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
