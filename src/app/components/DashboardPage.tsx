"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ThemeToggle } from "./ThemeToggle";
import {
    MessageSquare,
    ThumbsUp,
    TrendingUp,
    Users,
    DollarSign,
    Clock,
    BarChart,
    PieChart,
} from "lucide-react";
import {
    addDays,
    differenceInDays,
    eachMonthOfInterval,
    format,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import {
    ResponsiveContainer,
    Pie,
    Cell,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "../../componentsUi/ui/card";
import { DateRangePicker } from "../../componentsUi/ui/date-picker";

const SatisfactionChart = dynamic(() => import("./SatisfactionChart"), {
    ssr: false,
    loading: () => <p>Chargement du graphique...</p>,
});

const MetricCard = ({ title, value, description, icon: Icon, chartData }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex justify-between items-center">
            <div>
                <div className="text-2xl font-bold">{value}</div>
                <p
                    className={`text-xs ${
                        description.startsWith("+")
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {description}
                </p>
            </div>
            {chartData && (
                <div className="w-16 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={25}
                                outerRadius={32}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </CardContent>
    </Card>
);

const calculateSavings = (conversations: number, dateRange: DateRange) => {
    const avgTimeWithoutBot = 12.5; // 10-15 minutes en moyenne
    const avgTimeWithBot = 1.5; // 1-2 minutes en moyenne
    const timeSavedPerConversation = avgTimeWithoutBot - avgTimeWithBot;
    const totalTimeSaved = conversations * timeSavedPerConversation;

    const hourlyRate = 50; // Taux horaire moyen en CAD
    const moneySaved = (totalTimeSaved / 60) * hourlyRate;

    return {
        timeSaved: Math.round(totalTimeSaved),
        moneySaved: Math.round(moneySaved),
    };
};

const generateMonthlySavingsData = (dateRange: DateRange) => {
    const months = eachMonthOfInterval({
        start: dateRange.from!,
        end: dateRange.to!,
    });

    return months.map((month) => {
        const conversations = Math.floor(Math.random() * 5000) + 1000; // Random number of conversations
        const { moneySaved } = calculateSavings(conversations, {
            from: month,
            to: month,
        });
        return {
            month: format(month, "MMM"),
            économies: moneySaved,
        };
    });
};

const DashboardPage = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(2023, 0, 1),
        to: new Date(),
    });

    // Simulated data - replace with actual data in a real application
    const conversations = 12234;
    const { timeSaved, moneySaved } = calculateSavings(
        conversations,
        dateRange!
    );

    const daysInRange =
        dateRange?.from && dateRange?.to
            ? differenceInDays(dateRange.to, dateRange.from) + 1
            : 30;

    const monthlySavingsData = generateMonthlySavingsData(dateRange!);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Feedback Dashboard - ChatBot
                </h1>
                <div className="flex items-center space-x-4">
                    <DateRangePicker />
                    <ThemeToggle />
                </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
                    <TabsTrigger value="feedback">
                        Feedbacks détaillés
                    </TabsTrigger>
                    <TabsTrigger value="analytics">Analytiques</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <MetricCard
                            title="Note moyenne"
                            value="4.5/5"
                            description="+0.3 depuis le mois dernier"
                            icon={ThumbsUp}
                            chartData={[
                                {
                                    name: "Score",
                                    value: 4.5,
                                    color: "hsl(var(--primary))",
                                },
                                {
                                    name: "Reste",
                                    value: 0.5,
                                    color: "hsl(var(--muted))",
                                },
                            ]}
                        />
                        <MetricCard
                            title="Conversations"
                            value="12,234"
                            description="+19% depuis le mois dernier"
                            icon={MessageSquare}
                            chartData={undefined}
                        />
                        <MetricCard
                            title="Utilisateurs actifs"
                            value="1,429"
                            description="+8% depuis le mois dernier"
                            icon={Users}
                            chartData={undefined}
                        />
                        <MetricCard
                            title="Taux de résolution"
                            value="92%"
                            description="+5% depuis le mois dernier"
                            icon={TrendingUp}
                            chartData={[
                                {
                                    name: "Résolu",
                                    value: 92,
                                    color: "hsl(var(--primary))",
                                },
                                {
                                    name: "Non résolu",
                                    value: 8,
                                    color: "hsl(var(--muted))",
                                },
                            ]}
                        />
                    </div>
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Économies Réalisées</CardTitle>
                            <CardDescription>
                                Sur les derniers {daysInRange} jours
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <DollarSign className="h-8 w-8 text-green-500 mr-2" />
                                    <div>
                                        <p className="text-3xl font-bold">
                                            {moneySaved} CAD
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Économisés
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="h-8 w-8 text-blue-500 mr-2" />
                                    <div>
                                        <p className="text-3xl font-bold">
                                            {timeSaved} minutes
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Économisées
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar
                                        dataKey="économies"
                                        fill="hsl(var(--primary))"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                            <p className="mt-4 text-sm text-muted-foreground">
                                Basé sur {conversations} conversations, avec un
                                temps moyen de réponse réduit de 12.5 à 1.5
                                minutes.
                            </p>
                        </CardContent>
                    </Card>
                    <SatisfactionChart date={undefined} />
                </TabsContent>
                {/* ... autres TabsContent ... */}
            </Tabs>
        </div>
    );
};

export default DashboardPage;
