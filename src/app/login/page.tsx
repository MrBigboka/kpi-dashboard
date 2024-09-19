"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Building, Lock, Loader2 } from "lucide-react";
import { Label } from "../../../components/label";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import { motion } from "framer-motion";
import "./login.css"; // CSS pour le fond avec les étoiles

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await login(username, password);
            router.push("/");
        } catch (error) {
            setError("Erreur lors de la connexion. Vérifiez vos identifiants.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex h-screen items-center justify-center bg-black overflow-hidden">
            {/* Conserve l'arrière-plan avec étoiles */}
            <div className="absolute inset-0">
                <div id="stars" className="absolute inset-0"></div>
                <div id="stars2" className="absolute inset-0"></div>
                <div id="stars3" className="absolute inset-0"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 w-full max-w-sm p-8 bg-[rgba(16,19,231,0.2)] backdrop-blur-lg border border-white/30 rounded-2xl shadow-xl"
            >
                {/* Logo */}
                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <Image
                        src="/smartscaling.png"
                        width={175}
                        height={75}
                        alt="SmartScaling Logo"
                        className="w-auto h-16 object-contain"
                    />
                </motion.div>

                {/* Titre et sous-titre */}
                <motion.div
                    className="text-center mb-6"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-white">Connexion</h1>
                    <p className="text-sm text-blue-200 mt-1">
                        Entrez votre code d'entreprise et votre mot de passe
                    </p>
                </motion.div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <Label
                            htmlFor="username"
                            className="text-blue-100 font-semibold"
                        >
                            Code entreprise
                        </Label>
                        <div className="relative mt-1">
                            <Input
                                id="username"
                                type="text"
                                placeholder="Entrez le code de l'entreprise"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder-blue-300"
                            />
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        <Label
                            htmlFor="password"
                            className="text-blue-100 font-semibold"
                        >
                            Mot de passe
                        </Label>
                        <div className="relative mt-1">
                            <Input
                                id="password"
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 bg-blue-800/50 border-blue-600 text-white placeholder-blue-300"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" />
                        </div>
                    </motion.div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm text-center"
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <Button
                            type="submit"
                            className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <LogIn className="mr-2 h-4 w-4" />
                            )}
                            {isLoading ? "Connexion en cours..." : "Connexion"}
                        </Button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}
