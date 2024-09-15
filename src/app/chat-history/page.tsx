import Sidebar from "../home/Sidebar";
import ConversationPage from "./ConversationPage";

export default function ChatHistoryPage() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-grow">
                <Sidebar />
                <div className="flex-grow">
                    <ConversationPage />
                </div>
            </div>
            <footer className="w-full bg-zinc-900 text-center p-4 text-white">
                <p>
                    © {new Date().getFullYear()} SmartScaling | Historique des
                    conversations - Tous droits réservés
                </p>
            </footer>
        </div>
    );
}
