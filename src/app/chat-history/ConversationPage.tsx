"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
    ArrowLeftIcon,
    SendIcon,
    Search,
    Calendar,
    User,
    SortAsc,
    SortDesc,
} from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/avatar";
import { Button } from "../../../components/button";
import {
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@radix-ui/react-select";
import { Input } from "../../../components/input";
import { Card, CardContent } from "../components/ui/card";
import { Select } from "../../../components/select";
import { ScrollArea } from "../../../components/scroll-area";
import { motion } from "framer-motion";

// Données mockées pour les conversations
const conversationsMockees = [
    {
        id: 1,
        nom: "Jean Dupont",
        dernierMessage: "Bonjour, comment puis-je vous aider ?",
        horodatage: new Date("2023-05-01T10:30:00"),
    },
    {
        id: 2,
        nom: "Marie Martin",
        dernierMessage: "Merci pour votre assistance.",
        horodatage: new Date("2023-05-02T14:45:00"),
    },
    {
        id: 3,
        nom: "Alice Johnson",
        dernierMessage: "J'ai une question concernant mon compte.",
        horodatage: new Date("2023-05-03T09:15:00"),
    },
    {
        id: 4,
        nom: "Robert Williams",
        dernierMessage: "Pouvez-vous fournir plus d'informations ?",
        horodatage: new Date("2023-05-04T16:20:00"),
    },
    {
        id: 5,
        nom: "Eva Brown",
        dernierMessage: "J'apprécie votre aide.",
        horodatage: new Date("2023-05-05T11:00:00"),
    },
    {
        id: 6,
        nom: "David Lee",
        dernierMessage: "Je suis en train de réparer mon ordinateur.",
        horodatage: new Date("2023-05-06T08:45:00"),
    },
    {
        id: 7,
        nom: "Sophie Garcia",
        dernierMessage: "Merci pour votre réponse rapide.",
        horodatage: new Date("2023-05-07T13:30:00"),
    },
    {
        id: 8,
        nom: "Thomas Rodriguez",
        dernierMessage: "Je suis intéressé par vos services.",
        horodatage: new Date("2023-05-08T10:10:00"),
    },
    {
        id: 9,
        nom: "Julie Martinez",
        dernierMessage: "Pouvez-vous m'aider avec ma commande ?",
        horodatage: new Date("2023-05-09T15:55:00"),
    },
    {
        id: 10,
        nom: "Pauline Lopez",
        dernierMessage: "Je vous remercie pour votre soutien.",
        horodatage: new Date("2023-05-10T12:25:00"),
    },
];

// Données mockées pour les messages de chat
const messagesChatMockes = [
    {
        id: 1,
        expediteur: "utilisateur",
        contenu: "Bonjour, j'ai besoin d'aide avec ma commande.",
        horodatage: new Date("2023-05-01T10:30:00"),
    },
    {
        id: 2,
        expediteur: "bot",
        contenu:
            "Bien sûr ! Je serai ravi de vous aider. Pouvez-vous me fournir votre numéro de commande ?",
        horodatage: new Date("2023-05-01T10:31:00"),
    },
    {
        id: 3,
        expediteur: "utilisateur",
        contenu: "Mon numéro de commande est #12345.",
        horodatage: new Date("2023-05-01T10:32:00"),
    },
    {
        id: 4,
        expediteur: "bot",
        contenu:
            "Merci. J'ai trouvé votre commande. Quelle information spécifique recherchez-vous ?",
        horodatage: new Date("2023-05-01T10:33:00"),
    },
    {
        id: 5,
        expediteur: "utilisateur",
        contenu: "Je voudrais connaître la date de livraison estimée.",
        horodatage: new Date("2023-05-01T10:34:00"),
    },
    {
        id: 6,
        expediteur: "bot",
        contenu:
            "D'après les détails de votre commande, la date de livraison estimée est le 5 mai 2023.",
        horodatage: new Date("2023-05-01T10:35:00"),
    },
    {
        id: 7,
        expediteur: "utilisateur",
        contenu: "Merci pour l'information.",
        horodatage: new Date("2023-05-01T10:36:00"),
    },
    {
        id: 8,
        expediteur: "bot",
        contenu:
            "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.",
        horodatage: new Date("2023-05-01T10:37:00"),
    },
    {
        id: 9,
        expediteur: "utilisateur",
        contenu: "C'est parfait, merci !",
        horodatage: new Date("2023-05-01T10:38:00"),
    },
];

export default function PageConversation() {
    const [selectedConversation, setSelectedConversation] = useState<
        number | null
    >(null);
    const [nouveauMessage, setNouveauMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<"date" | "name">("date");

    const filteredAndSortedConversations = useMemo(() => {
        return conversationsMockees
            .filter(
                (conv) =>
                    conv.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    conv.dernierMessage
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                return sortBy === "date"
                    ? b.horodatage.getTime() - a.horodatage.getTime()
                    : a.nom.localeCompare(b.nom);
            });
    }, [searchTerm, sortBy]);

    const gererEnvoiMessage = () => {
        if (nouveauMessage.trim()) {
            console.log("Envoi du message :", nouveauMessage);
            setNouveauMessage("");
        }
    };

    return (
        <div className="flex h-screen bg-background">
            {/* Liste des conversations */}
            <div
                className={`w-full md:w-1/3 bg-card p-4 ${
                    selectedConversation ? "hidden md:block" : ""
                }`}
            >
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                    Conversations
                </h2>

                {/* Search and filter controls */}
                <div className="mb-4 space-y-2">
                    <div className="flex items-center space-x-2">
                        <Search className="text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Rechercher un utilisateur..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-grow"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select
                            value={sortBy}
                            onValueChange={(value: "date" | "name") =>
                                setSortBy(value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Trier par" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date">
                                    <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span>Date</span>
                                    </div>
                                </SelectItem>
                                <SelectItem value="name">
                                    <div className="flex items-center">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Nom</span>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <ScrollArea className="h-[calc(100vh-16rem)]">
                    {filteredAndSortedConversations.map((conversation) => (
                        <motion.div
                            key={conversation.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card
                                className="mb-2 cursor-pointer hover:bg-accent"
                                onClick={() =>
                                    setSelectedConversation(conversation.id)
                                }
                            >
                                <CardContent className="p-3">
                                    <div className="flex items-center">
                                        <Avatar className="h-10 w-10 flex-shrink-0">
                                            <AvatarImage
                                                src={`/placeholder.svg?height=40&width=40`}
                                                alt={conversation.nom}
                                            />
                                            <AvatarFallback>
                                                {conversation.nom
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="ml-3 flex-grow overflow-hidden">
                                            <p className="font-semibold text-foreground truncate">
                                                {conversation.nom}
                                            </p>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {conversation.dernierMessage}
                                            </p>
                                        </div>
                                        <p className="text-xs text-muted-foreground ml-2 whitespace-nowrap">
                                            {format(
                                                conversation.horodatage,
                                                "d MMM, HH:mm",
                                                { locale: fr }
                                            )}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </ScrollArea>
            </div>

            {/* Chat Interface */}
            <div
                className={`w-full md:w-2/3 bg-background flex flex-col ${
                    selectedConversation ? "" : "hidden md:flex"
                }`}
            >
                {selectedConversation ? (
                    <>
                        <motion.div
                            className="bg-card p-4 flex items-center border-b border-border"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden mr-2"
                                onClick={() => setSelectedConversation(null)}
                            >
                                <ArrowLeftIcon className="h-6 w-6" />
                            </Button>
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={`/placeholder.svg?height=40&width=40`}
                                    alt="Utilisateur sélectionné"
                                />
                                <AvatarFallback>
                                    {conversationsMockees
                                        .find(
                                            (c) => c.id === selectedConversation
                                        )
                                        ?.nom.split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>
                            <h3 className="ml-4 text-lg font-semibold text-foreground">
                                {
                                    conversationsMockees.find(
                                        (c) => c.id === selectedConversation
                                    )?.nom
                                }
                            </h3>
                        </motion.div>

                        <ScrollArea className="flex-grow p-4">
                            {messagesChatMockes.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        originX:
                                            message.expediteur === "utilisateur"
                                                ? 1
                                                : 0,
                                    }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className={`mb-4 ${
                                        message.expediteur === "utilisateur"
                                            ? "text-right"
                                            : "text-left"
                                    }`}
                                >
                                    <div
                                        className={`inline-block p-2 rounded-lg ${
                                            message.expediteur === "utilisateur"
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-secondary-foreground"
                                        }`}
                                    >
                                        {message.contenu}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {format(message.horodatage, "HH:mm")}
                                    </p>
                                </motion.div>
                            ))}
                        </ScrollArea>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <motion.p
                            className="text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Sélectionnez une conversation pour commencer à
                            discuter
                        </motion.p>
                    </div>
                )}
            </div>
        </div>
    );
}
