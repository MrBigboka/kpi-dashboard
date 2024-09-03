import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { ThemeToggle } from "./ThemeToggle";
import { DollarSign, MessageSquare, SmilePlus, TrendingUp } from "lucide-react";

// Données factices pour le graphique des revenus mensuels
const monthlyRevenueData = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 6200 },
    { month: "Mar", revenue: 7800 },
    { month: "Apr", revenue: 5500 },
    { month: "May", revenue: 6800 },
    { month: "Jun", revenue: 7200 },
    // ... Ajoutez les données pour les autres mois
];

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    icon: React.ElementType;
}

const MetricCard: React.FC<MetricCardProps> = ({
    title,
    value,
    change,
    icon: Icon,
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">
                <span
                    className={
                        change.startsWith("+")
                            ? "text-green-600"
                            : "text-red-600"
                    }
                >
                    {change}
                </span>
                {" depuis le mois dernier"}
            </p>
        </CardContent>
    </Card>
);

interface SatisfactionCardProps {
    rating: number;
    change: string;
}

const SatisfactionCard: React.FC<SatisfactionCardProps> = ({
    rating,
    change,
}) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Satisfaction du Bot
            </CardTitle>
            <SmilePlus className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-2xl font-bold">
                        {rating.toFixed(1)}/5
                    </div>
                    <p className="text-xs text-muted-foreground">
                        <span
                            className={
                                change.startsWith("+")
                                    ? "text-green-600"
                                    : "text-red-600"
                            }
                        >
                            {change}
                        </span>
                        {" depuis le mois dernier"}
                    </p>
                </div>
                <div className="h-16 w-16 flex items-center justify-center border-2 border-primary rounded-full">
                    <span className="text-lg font-bold">
                        {rating.toFixed(1)}
                    </span>
                </div>
            </div>
        </CardContent>
    </Card>
);

const RevenueChart: React.FC = () => (
    <Card className="col-span-4">
        <CardHeader>
            <CardTitle>Revenus Mensuels</CardTitle>
        </CardHeader>
        <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                        }}
                        formatter={(value) => [`$${value}`, "Revenue"]}
                    />
                    <Bar
                        dataKey="revenue"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
);

const DashboardPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <ThemeToggle />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                    title="Revenus Totaux"
                    value="CAD 45,231.89"
                    change="+20.1%"
                    icon={DollarSign}
                />
                <MetricCard
                    title="Sessions Chatbot"
                    value="2,350"
                    change="+15.3%"
                    icon={MessageSquare}
                />
                <SatisfactionCard rating={4.2} change="+0.3" />
                <RevenueChart />
            </div>
        </div>
    );
};

export default DashboardPage;
