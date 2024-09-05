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
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
    ThumbsUp,
    MessageSquare,
    Users,
    TrendingUp,
    DollarSign,
    Clock,
} from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "../../componentsUi/ui/card";
import { DatePickerWithRange } from "../../componentsUi/ui/date-picker";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "../../../@/components/ui/tabs";

import DownloadButton from "./DownloadButton";
import MetricCard from "./MetricCard";
import { Button } from "../../../@/components/ui/button";
import { Textarea } from "../../../@/components/ui/textarea";
import { Input } from "../../../@/components/ui/input";

const calculateSavings = (conversations, dateRange) => {
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

const generateMonthlySavingsData = (dateRange) => {
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

const DashboardPage = () => {
    const [dateRange, setDateRange] = useState({
        from: new Date(2023, 0, 1),
        to: new Date(),
    });
    const conversations = 12234;
    const { timeSaved, moneySaved } = calculateSavings(
        conversations,
        dateRange
    );

    const [contactTitle, setContactTitle] = useState("");
    const [contactBody, setContactBody] = useState("");

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulaire soumis:", { contactTitle, contactBody });
        setContactTitle("");
        setContactBody("");
    };

    const timeSavedText =
        timeSaved >= 60
            ? `${(timeSaved / 60).toFixed(0)} heures`
            : `${timeSaved} minutes`;

    const formattedMoneySaved = new Intl.NumberFormat("fr-CA", {
        style: "currency",
        currency: "CAD",
    }).format(moneySaved);

    const daysInRange = differenceInDays(dateRange.to, dateRange.from) + 1;

    const monthlySavingsData = generateMonthlySavingsData(dateRange);

    const metricCardsData = [
        {
            title: "Note moyenne",
            value: "4,4/5",
            description: "+0,3% depuis le mois dernier",
            icon: ThumbsUp,
        },
        {
            title: "Conversations",
            value: "12 234",
            description: "+19% depuis le mois dernier",
            icon: MessageSquare,
        },
        {
            title: "Utilisateurs actifs",
            value: "1 429",
            description: "+8% depuis le mois dernier",
            icon: Users,
        },
        {
            title: "Taux de résolution",
            value: "92%",
            description: "+5% depuis le mois dernier",
            icon: TrendingUp,
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Tableau de bord - SOFIA</h1>
                <div className="flex items-center space-x-4">
                    <DatePickerWithRange />
                    <DownloadButton />
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
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
                <TabsContent value="contact">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contactez-nous</CardTitle>
                            <CardDescription>
                                Envoyez-nous un message
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleContactSubmit}
                                className="space-y-4"
                            >
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Titre
                                    </label>
                                    <Input
                                        id="title"
                                        value={contactTitle}
                                        onChange={(e) =>
                                            setContactTitle(e.target.value)
                                        }
                                        placeholder="Entrez le titre de votre message"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="body"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Message
                                    </label>
                                    <Textarea
                                        id="body"
                                        value={contactBody}
                                        onChange={(e) =>
                                            setContactBody(e.target.value)
                                        }
                                        placeholder="Entrez votre message"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <Button type="submit">Envoyer</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DashboardPage;
