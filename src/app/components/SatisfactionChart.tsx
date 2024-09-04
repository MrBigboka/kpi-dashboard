"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
} from "recharts";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "../../componentsUi/ui/card";
import { DollarSign } from "lucide-react";

const calculateSavings = (conversations, resolutionRate) => {
    const resolvedConversations = conversations * (resolutionRate / 100);
    const averageCostPerConversation = 5; // Supposons un coût moyen de 5$ par conversation
    return resolvedConversations * averageCostPerConversation;
};

const feedbackData = [
    { month: "Jan", satisfaction: 4.2, conversations: 1000 },
    { month: "Fév", satisfaction: 4.3, conversations: 1200 },
    { month: "Mar", satisfaction: 4.1, conversations: 1100 },
    { month: "Avr", satisfaction: 4.4, conversations: 1300 },
    { month: "Mai", satisfaction: 4.6, conversations: 1500 },
    { month: "Jun", satisfaction: 4.5, conversations: 1400 },
];

const SatisfactionChart = ({ date }) => {
    const filteredData = feedbackData.filter(
        (d, index) =>
            index >= date.from.getMonth() && index <= date.to.getMonth()
    );

    const totalConversations = filteredData.reduce(
        (sum, d) => sum + d.conversations,
        0
    );
    const averageSatisfaction =
        filteredData.reduce((sum, d) => sum + d.satisfaction, 0) /
        filteredData.length;
    const savings = calculateSavings(totalConversations, 92); // Assuming 92% resolution rate

    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>
                    Évolution de la satisfaction et économies réalisées
                </CardTitle>
                <CardDescription>
                    Note moyenne mensuelle et conversations sur la période
                    sélectionnée
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <div className="text-2xl font-bold flex items-center">
                        <DollarSign className="h-6 w-6 mr-2 text-green-500" />
                        {savings.toFixed(2)} CAD économisés
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Basé sur {totalConversations} conversations avec un taux
                        de résolution de 92%
                    </p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis
                            yAxisId="left"
                            orientation="left"
                            stroke="hsl(var(--primary))"
                        />
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="hsl(var(--muted))"
                        />
                        <Tooltip />
                        <Bar
                            yAxisId="left"
                            dataKey="satisfaction"
                            fill="hsl(var(--primary))"
                            radius={[4, 4, 0, 0]}
                        >
                            <LabelList dataKey="satisfaction" position="top" />
                        </Bar>
                        <Bar
                            yAxisId="right"
                            dataKey="conversations"
                            fill="hsl(var(--muted))"
                            radius={[4, 4, 0, 0]}
                        >
                            <LabelList dataKey="conversations" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default SatisfactionChart;
