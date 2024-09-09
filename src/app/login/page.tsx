"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Pour la redirection
import { Mail, Lock, LogIn, Building } from "lucide-react"; // Icônes
import { Label } from "../../../@/components/ui/label";
import { Button } from "../../../@/components/ui/button";
import { Input } from "../../../@/components/ui/input";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (email === "1234" && password === "1234") {
            router.push("/"); // Redirection vers le dashboard après la connexion
        } else {
            alert("Identifiants incorrects");
        }
    }

    return (
        <div className="relative flex h-screen w-screen items-center justify-center">
            {/* Animation du dégradé superposée à l'image de fond */}
            <div
                className="absolute inset-0 animate-gradient-x"
                style={{
                    backgroundImage:
                        "linear-gradient(270deg, rgba(255, 138, 0, 0.5), rgba(229, 46, 113, 0.5), rgba(156, 26, 255, 0.5), rgba(0, 198, 255, 0.5))",
                    backgroundSize: "400% 400%",
                    opacity: 0.1, // Opacité réduite du dégradé
                    zIndex: 1,
                }}
            />
            {/* Image de fond */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: "url('/login.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 0,
                }}
            />

            <div className="z-10 w-full max-w-md p-6 bg-white rounded-lg shadow-lg lg:max-w-lg">
                {/* Logo en haut */}
                <div className="flex justify-center mb-6">
                    <Image
                        src="/smartscaling.png"
                        width={175}
                        height={75}
                        alt="SmartScaling Logo"
                    />
                </div>

                {/* Titre pour le dashboard */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Connexion
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Entrer votre code d'entreprise et votre mots de passe
                    </p>
                </div>

                {/* Formulaire de connexion */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label
                            htmlFor="email"
                            className="text-gray-700 font-semibold"
                        >
                            Code entreprise
                        </Label>
                        <div className="relative">
                            <Input
                                id="email"
                                type="text"
                                placeholder="Entrez le code de l'entreprise"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10"
                            />
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="mb-6">
                        <Label
                            htmlFor="password"
                            className="text-gray-700 font-semibold"
                        >
                            Mot de passe
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10"
                            />
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full flex items-center justify-center"
                    >
                        <LogIn className="mr-2 h-4 w-4" /> Connexion
                    </Button>
                </form>

                {/* Citation en bas */}
                <div className="mt-6 text-center">
                    <blockquote className="space-y-2">
                        <p className="text-sm italic text-gray-700">
                            &ldquo;L'IA et l'automatisation ne sont pas
                            seulement des outils, ce sont des catalyseurs de
                            progrès. Avec SmartScaling, nous avons transformé
                            notre approche de la productivité, permettant à
                            notre équipe de se concentrer sur l'innovation
                            plutôt que sur les tâches répétitives.&rdquo;
                        </p>
                        <footer className="text-xs text-gray-500">
                            Tout droit réservé à SmartScaling™
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}
