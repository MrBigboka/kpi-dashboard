import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const data = [
    { month: "Jan", value: 5000 },
    { month: "Feb", value: 1000 },
    { month: "Mar", value: 5800 },
    { month: "Apr", value: 5200 },
    { month: "May", value: 2000 },
    { month: "Jun", value: 2500 },
    { month: "Jul", value: 4600 },
    { month: "Aug", value: 4800 },
    { month: "Sep", value: 2600 },
    { month: "Oct", value: 3800 },
    { month: "Nov", value: 3700 },
    { month: "Dec", value: 2200 },
];

const OverviewChart: React.FC = () => {
    return (
        <Card className="w-full h-[400px]">
            <CardHeader>
                <CardTitle>Aperçu des revenus économiser</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                background: "#333",
                                border: "none",
                            }}
                            itemStyle={{ color: "#fff" }}
                            formatter={(value) => [`$${value}`, "Revenue"]}
                        />
                        <Bar
                            dataKey="value"
                            fill="#8884d8"
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default OverviewChart;
