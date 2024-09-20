"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Camera,
    Cog,
    Folder,
    Mail,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { ScrollArea } from "../../../@/components/ui/scroll-area";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/util";
import { Button } from "../../../@/components/ui/button";
import FilesTab from "../files/FilesTab"; // Import du FilesTab
import ContactTab from "../contact/ContactTab"; // Import du ContactTab

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("dashboard");
    const [avatarSrc, setAvatarSrc] = useState("/gestrago.jpg");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === "/") {
            setActive("dashboard");
        } else if (pathname === "/automatisation") {
            setActive("automatisation-request");
        } else if (pathname === "/files") {
            setActive("files");
        } else if (pathname === "/contact") {
            setActive("contact");
        }
    }, [pathname]);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (typeof e.target?.result === "string") {
                    setAvatarSrc(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const navItems = [
        {
            id: "dashboard",
            icon: LayoutDashboard,
            label: "Tableau de bord",
            path: "/",
        },
        {
            id: "automatisation-request",
            icon: Cog,
            label: "Demande d'automatisation",
            path: "/automatisation",
        },
        {
            id: "files",
            icon: Folder,
            label: "Envoie de fichiers",
            path: "/files",
        },
        {
            id: "contact",
            icon: Mail,
            label: "Contact",
            path: "/contact",
        },
    ];

    return (
        <motion.div
            className={cn(
                "flex flex-col h-screen transition-all duration-300 sticky top-0 bg-background border-r border-gray-200 dark:border-gray-800",
                isOpen ? "w-64" : "w-16"
            )}
            animate={{ width: isOpen ? 256 : 64 }}
        >
            {/* Logo et Compte Connecté */}
            <div className="flex flex-col items-center p-4 relative">
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAvatarClick}
                    className="cursor-pointer relative"
                >
                    <Avatar
                        className={cn(
                            "transition-all duration-300",
                            isOpen ? "w-16 h-16" : "w-12 h-12"
                        )}
                    >
                        <AvatarImage src={avatarSrc} alt="Logo" />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <motion.div
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                    >
                        <Camera className="text-white" size={24} />
                    </motion.div>
                </motion.div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mt-2 text-center text-gray-900 dark:text-gray-200"
                        >
                            <span>Gestrago</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Toggle Dark/Light Mode */}
            <div className="flex items-center justify-center my-4">
                <ThemeToggle />
            </div>

            {/* Menu de Navigation */}
            <ScrollArea className="flex-grow h-0 md:h-auto">
                <nav className="flex flex-col mt-4">
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={cn(
                                "w-full justify-center text-gray-700 dark:text-gray-300 relative rounded-none",
                                active === item.id && "bg-transparent",
                                "group"
                            )}
                            onClick={() => {
                                setActive(item.id);
                                router.push(item.path);
                            }}
                        >
                            <item.icon
                                className={cn(
                                    "transition-all",
                                    isOpen
                                        ? "h-4 w-4 mr-2"
                                        : "h-5 w-5 block mx-auto",
                                    active === item.id
                                        ? "text-[#007bff]"
                                        : "text-gray-700 dark:text-gray-300 group-hover:text-[#007bff]"
                                )}
                            />
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="overflow-hidden whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            <motion.div
                                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                                initial={{ width: "0%" }}
                                animate={{
                                    width: active === item.id ? "100%" : "0%",
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </Button>
                    ))}
                </nav>
            </ScrollArea>

            {/* Bouton de Déconnexion */}
            <div className="flex justify-center p-4">
                <Button
                    variant={isOpen ? "ghost" : "outline"}
                    className={cn(
                        "w-full justify-center relative overflow-hidden",
                        isOpen
                            ? "text-red-500 rounded-none dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 hover:text-red-700 dark:hover:text-red-200"
                            : "text-red-500 dark:text-red-400 border-red-500 dark:border-red-400",
                        active === "logout" && "bg-red-100 dark:bg-red-800",
                        !isOpen && "h-12 p-0"
                    )}
                    onClick={() => {
                        setActive("logout");
                        router.push("/login");
                    }}
                >
                    <div
                        className={cn(
                            "flex items-center justify-center",
                            isOpen ? "w-full" : "w-full h-full"
                        )}
                    >
                        <LogOut
                            className={cn(
                                "transition-all",
                                isOpen ? "h-4 w-4 mr-2" : "h-6 w-6"
                            )}
                        />
                        <AnimatePresence>
                            {isOpen && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="overflow-hidden whitespace-nowrap"
                                >
                                    Déconnexion
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </Button>
            </div>

            {/* Toggle Sidebar */}
            <div className="flex justify-center p-4">
                <Button
                    variant="ghost"
                    onClick={toggleSidebar}
                    className="text-gray-700 dark:text-gray-300 focus:outline-none"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isOpen ? (
                            <motion.div
                                key="chevronLeft"
                                initial={{ rotate: 180 }}
                                animate={{ rotate: 0 }}
                                exit={{ rotate: 180 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chevronRight"
                                initial={{ rotate: 180 }}
                                animate={{ rotate: 0 }}
                                exit={{ rotate: 180 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>
            </div>
        </motion.div>
    );
}
