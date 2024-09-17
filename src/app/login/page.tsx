"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogIn, Building, Lock, Loader2 } from "lucide-react"; // Utiliser Loader2 comme spinner
import { Label } from "../../../components/label";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";
import { useAuth } from "../context/AuthContext"; // Importer useAuth
import Image from "next/image";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false); // État de chargement
    const [error, setError] = useState<string | null>(null); // État pour l'erreur
    const { login } = useAuth(); // Récupérer la fonction login du contexte
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true); // Démarrer le spinner
        setError(null); // Réinitialiser l'erreur
        try {
            await login(username, password);
            router.push("/"); // Redirection vers la page d'accueil
        } catch (error) {
            setError("Erreur lors de la connexion. Vérifiez vos identifiants.");
        } finally {
            setIsLoading(false); // Arrêter le spinner
        }
    };

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
                        Entrer votre code d'entreprise et votre mot de passe
                    </p>
                </div>

                {/* Formulaire de connexion */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <Label
                            htmlFor="username"
                            className="text-gray-700 font-semibold"
                        >
                            Code entreprise
                        </Label>
                        <div className="relative">
                            <Input
                                id="username"
                                type="text"
                                placeholder="Entrez le code de l'entreprise"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                        disabled={isLoading} // Désactiver le bouton pendant le chargement
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <LogIn className="mr-2 h-4 w-4" />
                        )}
                        {isLoading ? "Connexion en cours..." : "Connexion"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
