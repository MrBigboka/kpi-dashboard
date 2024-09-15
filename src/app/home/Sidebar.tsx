"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
    LogOut,
    MessageCircle,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import "./Sidebar.css";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { cn } from "../lib/util";
import { Button } from "../../../components/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/avatar";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("dashboard");
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/") {
            setActive("dashboard");
        } else if (pathname === "/chat-history") {
            setActive("chat-history");
        }
    }, [pathname]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const navItems = [
        {
            id: "dashboard",
            icon: LayoutDashboard,
            label: "Tableau de bord",
            path: "/",
        },
        {
            id: "chat-history",
            icon: MessageCircle,
            label: "Historique des chats",
            path: "/chat-history",
        },
    ];

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

            {/* Menu de Navigation */}
            <ScrollArea className="flex-grow">
                <nav className="flex flex-col mt-4">
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white relative",
                                active === item.id &&
                                    "bg-gray-100 dark:bg-gray-800",
                                "group"
                            )}
                            onClick={() => {
                                setActive(item.id);
                                router.push(item.path);
                            }}
                        >
                            <item.icon
                                className={`transition-all ${
                                    isOpen ? "h-3 w-3 mr-2" : "h-5 w-5"
                                }`}
                            />
                            {isOpen && <span>{item.label}</span>}
                            <div
                                className={cn(
                                    "absolute bottom-0 left-0 h-0.5 bg-primary transition-all",
                                    active === item.id ? "w-full" : "w-0",
                                    "group-hover:w-full"
                                )}
                            />
                        </Button>
                    ))}
                </nav>
            </ScrollArea>

            {/* Bouton de Déconnexion */}
            <div className="flex justify-center p-4">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white relative",
                        active === "logout" && "bg-gray-100 dark:bg-gray-800"
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
