"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation
import {
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from "lucide-react"; // Icônes ShadCN
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../@/components/ui/avatar";
import { Button } from "../../../@/components/ui/button";
import { ScrollArea } from "../../../@/components/ui/scroll-area";
import { cn } from "../lib/util";
import { ThemeToggle } from "./ThemeToggle";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [active, setActive] = useState("dashboard"); // Pour garder une trace du bouton sélectionné
    const router = useRouter();

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div
            className={cn(
                "flex flex-col h-screen transition-all duration-300 sticky top-0 bg-background border-r border-gray-400 dark:border-gray-600 dark:bg-gray-900",
                isOpen ? "w-64" : "w-20"
            )}
        >
            {/* Logo et Compte Connecté */}
            <div className="flex flex-col items-center p-4">
                <Avatar
                    className={cn(
                        "transition-all duration-300",
                        isOpen ? "w-16 h-16" : "w-12 h-12"
                    )}
                >
                    <AvatarImage src="/gestrago.jpg" alt="Logo" />
                    <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {isOpen && (
                    <div className="mt-2 text-center text-gray-900 dark:text-gray-200">
                        <span>Gestrago</span>
                    </div>
                )}
            </div>

            {/* Menu de Navigation - Seulement Tableau de bord */}
            <ScrollArea className="flex-grow">
                <nav className="flex flex-col mt-4">
                    <Button
                        variant="ghost"
                        className={cn(
                            "w-full justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white relative",
                            !isOpen &&
                                active === "dashboard" &&
                                "border-r-4 border-black dark:border-white"
                        )}
                        onClick={() => {
                            setActive("dashboard");
                            router.push("/");
                        }}
                    >
                        <LayoutDashboard
                            className={`transition-all ${
                                isOpen ? "h-3 w-3 mr-2" : "h-5 w-5"
                            }`}
                        />
                        {isOpen && <span>Tableau de bord</span>}
                    </Button>
                </nav>
            </ScrollArea>

            {/* Bouton de Déconnexion */}
            <div className="flex justify-center p-4">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white relative",
                        !isOpen &&
                            active === "logout" &&
                            "border-r-4 border-black dark:border-white"
                    )}
                    onClick={() => {
                        setActive("logout");
                        router.push("/login");
                    }}
                >
                    <LogOut
                        className={`transition-all ${
                            isOpen ? "h-3 w-3 mr-2" : "h-5 w-5"
                        }`}
                    />
                    {isOpen && <span>Déconnexion</span>}
                </Button>
            </div>

            {/* Toggle Dark/Light Mode */}
            <div className="flex items-center justify-center my-4">
                <ThemeToggle />
            </div>

            {/* Toggle Sidebar */}
            <div className="flex justify-center p-4">
                <Button
                    variant="ghost"
                    onClick={toggleSidebar}
                    className="text-gray-700 dark:text-gray-300 focus:outline-none"
                >
                    {isOpen ? (
                        <ChevronLeft className="h-4 w-4" />
                    ) : (
                        <ChevronRight className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </div>
    );
}
