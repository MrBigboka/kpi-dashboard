"use client";

import React, { useState } from "react";
import {
    addDays,
    differenceInDays,
    eachMonthOfInterval,
    format,
} from "date-fns";
import { fr } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import {
    Bar,
    BarChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";
import {
    ThumbsUp,
    MessageSquare,
    Users,
    TrendingUp,
    DollarSign,
    Clock,
    Bug,
    FilePlus,
    HelpCircle,
    Wrench,
    Table,
    Upload,
    Home,
    Folder,
    Mail,
} from "lucide-react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import DownloadButton from "./DownloadButton";
import MetricCard from "./MetricCard";
import { Input } from "../../../@/components/ui/input";
import { Textarea } from "../../../@/components/ui/textarea";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "../../componentsUi/ui/card";
import DateRangePicker from "../../componentsUi/ui/date-picker";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../@/components/ui/tabs";
import { Button } from "../../../@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../@/components/ui/select";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../@/components/ui/table";
import { useDropzone } from "react-dropzone";

interface SavingsData {
    timeSaved: number;
    moneySaved: number;
}

interface MonthlySavingsData {
    month: string;
    économies: number;
}

const calculateSavings = (
    conversations: number,
    dateRange: DateRange
): SavingsData => {
    const avgTimeWithoutBot = 12.5;
    const avgTimeWithBot = 1.5;
    const timeSavedPerConversation = avgTimeWithoutBot - avgTimeWithBot;
    const totalTimeSaved = conversations * timeSavedPerConversation;

    const hourlyRate = 50;
    const moneySaved = (totalTimeSaved / 60) * hourlyRate;

    return {
        timeSaved: Math.round(totalTimeSaved),
        moneySaved: Math.round(moneySaved),
    };
};

const generateMonthlySavingsData = (
    dateRange: DateRange
): MonthlySavingsData[] => {
    if (!dateRange.from || !dateRange.to) return [];

    const months = eachMonthOfInterval({
        start: dateRange.from,
        end: dateRange.to,
    });

    return months.map((month) => {
        const conversations = Math.floor(Math.random() * 5000) + 1000;
        const { moneySaved } = calculateSavings(conversations, {
            from: month,
            to: month,
        });
        return {
            month: format(month, "MMM", { locale: fr }),
            économies: moneySaved,
        };
    });
};

const tasks = [
    {
        id: "TACH-001",
        description:
            "Configurer l'intégration du chatbot avec la base de données",
        status: "En cours",
        priority: "Haute",
        responsable: "Jean Dupont",
    },
    {
        id: "TACH-002",
        description:
            "Créer des modèles de réponses pour les requêtes des utilisateurs",
        status: "En attente",
        priority: "Moyenne",
        responsable: "Marie Lemay",
    },
    {
        id: "TACH-003",
        description: "Optimiser les performances du chatbot",
        status: "Complété",
        priority: "Basse",
        responsable: "Alice Martin",
    },
    {
        id: "TACH-004",
        description: "Mettre en place la gestion des erreurs",
        status: "En cours",
        priority: "Haute",
        responsable: "Jacques Roy",
    },
];

const metricCardsData = [
    {
        title: "Note moyenne",
        value: "4,4/5",
        description: "+0,3% depuis le mois dernier",
        icon: ThumbsUp,
        subtitle: "Satisfaction client",
    },
    {
        title: "Conversations",
        value: "12 234",
        description: "+19% depuis le mois dernier",
        icon: MessageSquare,
        subtitle: "Interactions totales",
    },
    {
        title: "Utilisateurs actifs",
        value: "1 429",
        description: "+8% depuis le mois dernier",
        icon: Users,
        subtitle: "Engagement mensuel",
    },
    {
        title: "Taux de résolution",
        value: "92%",
        description: "+5% depuis le mois dernier",
        icon: TrendingUp,
        subtitle: "Efficacité du service",
    },
];

interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
}) => {
    if (active && payload && payload.length > 0 && label) {
        const savings = payload[0].value;
        const timeSaved = Math.round((savings / 50) * 60);
        const conversations = Math.round(timeSaved / 11);

        return (
            <Popover>
                <PopoverTrigger asChild>
                    <div className="bg-background border rounded p-2 shadow-lg">
                        <p className="font-bold">{label}</p>
                        <p>Économies: {savings.toLocaleString("fr-CA")} CAD</p>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium leading-none">
                                Détails pour {label}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                                Voici un aperçu détaillé des économies réalisées
                                ce mois-ci.
                            </p>
                        </div>
                        <div className="grid gap-2">
                            <div className="grid grid-cols-2 items-center gap-4">
                                <span className="text-sm">
                                    Économies totales:
                                </span>
                                <span className="font-medium">
                                    {savings.toLocaleString("fr-CA")} CAD
                                </span>
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <span className="text-sm">
                                    Temps économisé:
                                </span>
                                <span className="font-medium">
                                    {timeSaved} minutes
                                </span>
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <span className="text-sm">Conversations:</span>
                                <span className="font-medium">
                                    {conversations.toLocaleString("fr-CA")}
                                </span>
                            </div>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        );
    }
    return null;
};

const files = [
    { id: 1, name: "Rapport janvier.pdf", size: "2.3 MB", date: "01/02/2024" },
    { id: 2, name: "Rapport février.pdf", size: "3.1 MB", date: "01/03/2024" },
];

const FileUpload = ({ onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center"
        >
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="text-gray-500 mt-2">
                Glissez et déposez vos fichiers ici, ou cliquez pour télécharger
            </p>
        </div>
    );
};

const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("overview");
    const [dateRange, setDateRange] = useState<DateRange>({
        from: new Date(2023, 0, 1),
        to: new Date(),
    });
    const [contactTitle, setContactTitle] = useState<string>("");
    const [contactBody, setContactBody] = useState<string>("");
    const [contactType, setContactType] = useState<string>("");
    const [uploadedFiles, setUploadedFiles] = useState(files);

    const handleFileUpload = (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
            id: uploadedFiles.length + 1,
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
            date: new Date().toLocaleDateString(),
        }));
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };
    const conversations = 12234;
    const { timeSaved, moneySaved } = calculateSavings(
        conversations,
        dateRange
    );

    const timeSavedText =
        timeSaved >= 60
            ? `${Math.floor(timeSaved / 60)} heures`
            : `${timeSaved} minutes`;

    const formattedMoneySaved = new Intl.NumberFormat("fr-CA", {
        style: "currency",
        currency: "CAD",
    }).format(moneySaved);

    const daysInRange =
        dateRange.from && dateRange.to
            ? differenceInDays(dateRange.to, dateRange.from) + 1
            : 0;

    const monthlySavingsData = generateMonthlySavingsData(dateRange);

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulaire soumis:", {
            contactType,
            contactTitle,
            contactBody,
        });
        setContactType("");
        setContactTitle("");
        setContactBody("");
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold">
                        Tableau de bord - SOFIA
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Analyse et performance du chatbot
                    </p>
                </div>
                {activeTab === "overview" && (
                    <div className="flex items-center space-x-4">
                        <DateRangePicker />
                        <DownloadButton />
                    </div>
                )}
            </div>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
            >
                <TabsList>
                    <TabsTrigger value="overview">
                        <Home className="mr-2 h-5 w-5" />
                        Vue d'ensemble
                    </TabsTrigger>
                    <TabsTrigger value="files">
                        <Folder className="mr-2 h-5 w-5" />
                        Envoie de fichier
                    </TabsTrigger>
                    <TabsTrigger value="contact">
                        <Mail className="mr-2 h-5 w-5" />
                        Contact
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {metricCardsData.map((metricData, index) => (
                            <MetricCard key={index} {...metricData} />
                        ))}
                    </div>
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Économies Réalisées</CardTitle>
                            <CardDescription>
                                Sur les derniers {daysInRange} jours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <DollarSign className="h-8 w-8 text-primary mr-2" />
                                    <div>
                                        <p className="text-3xl font-bold">
                                            {formattedMoneySaved}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Économisés
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-8 w-8 text-primary mr-2" />
                                    <div>
                                        <p className="text-3xl font-bold">
                                            {timeSavedText}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Économisées
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlySavingsData}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="économies"
                                            fill="hsl(var(--primary))"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">
                                Basé sur {conversations.toLocaleString("fr-CA")}{" "}
                                conversations, avec un temps moyen de réponse
                                réduit de 12,5 à 1,5 minutes.
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="files">
                    <Card className="mb-4">
                        <CardHeader>
                            <CardTitle>Fichiers actuels</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nom du fichier</TableHead>
                                        <TableHead>Taille</TableHead>
                                        <TableHead>
                                            Date de téléversement
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {uploadedFiles.length > 0 ? (
                                        uploadedFiles.map((file) => (
                                            <TableRow key={file.id}>
                                                <TableCell>
                                                    {file.name}
                                                </TableCell>
                                                <TableCell>
                                                    {file.size}
                                                </TableCell>
                                                <TableCell>
                                                    {file.date}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={3}
                                                className="text-center"
                                            >
                                                Aucun fichier téléchargé
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Glisser-déposer un fichier</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FileUpload onDrop={handleFileUpload} />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="contact">
                    <Card className="w-full max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-2xl">
                                Contactez-nous
                            </CardTitle>
                            <CardDescription>
                                Envoyez-nous vos commentaires, signalements de
                                bogues, suggestions d'amélioration ou toute
                                autre demande.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleContactSubmit}
                                className="space-y-6"
                            >
                                <div className="space-y-2">
                                    <label
                                        htmlFor="contactType"
                                        className="text-sm font-medium"
                                    >
                                        Type de demande
                                    </label>
                                    <Select
                                        onValueChange={setContactType}
                                        required
                                    >
                                        <SelectTrigger id="contactType">
                                            <SelectValue placeholder="Sélectionnez le type de demande" />
                                        </SelectTrigger>
                                        <SelectContent className="w-auto min-w-[200px]">
                                            <SelectItem
                                                value="bug"
                                                className="custom-select-item"
                                            >
                                                <Bug className="custom-select-item-icon h-5 w-5" />
                                                <span>
                                                    Signalement de bogue
                                                </span>
                                            </SelectItem>
                                            <SelectItem
                                                value="improvement"
                                                className="custom-select-item"
                                            >
                                                <Wrench className="custom-select-item-icon h-5 w-5" />
                                                <span>
                                                    Suggestion d'amélioration
                                                </span>
                                            </SelectItem>
                                            <SelectItem
                                                value="change"
                                                className="custom-select-item"
                                            >
                                                <FilePlus className="custom-select-item-icon h-5 w-5" />
                                                <span>
                                                    Demande de changement
                                                </span>
                                            </SelectItem>
                                            <SelectItem
                                                value="other"
                                                className="custom-select-item"
                                            >
                                                <HelpCircle className="custom-select-item-icon h-5 w-5" />
                                                <span>Autre demande</span>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="title"
                                        className="text-sm font-medium"
                                    >
                                        Titre
                                    </label>
                                    <Input
                                        id="title"
                                        value={contactTitle}
                                        onChange={(e) =>
                                            setContactTitle(e.target.value)
                                        }
                                        placeholder="Résumez brièvement votre demande"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="body"
                                        className="text-sm font-medium"
                                    >
                                        Description
                                    </label>
                                    <Textarea
                                        id="body"
                                        value={contactBody}
                                        onChange={(e) =>
                                            setContactBody(e.target.value)
                                        }
                                        rows={6}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Envoyer
                                    <PaperPlaneIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DashboardPage;
