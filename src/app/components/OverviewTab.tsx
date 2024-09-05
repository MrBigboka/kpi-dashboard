import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../componentsUi/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DollarSign, Clock } from "lucide-react";
import MetricCard from "./MetricCard";
import CustomTooltip from "../helper/CustomTootip";

interface MetricCardData {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<any>;
  subtitle: string;
}

interface OverviewTabProps {
  metricCardsData: MetricCardData[];
  formattedMoneySaved: string;
  timeSavedText: string;
  monthlySavingsData: Array<{ month: string; économies: number }>;
  daysInRange: number;
  conversations: number;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  metricCardsData,
  formattedMoneySaved,
  timeSavedText,
  monthlySavingsData,
  daysInRange,
  conversations,
}) => {
  return (
    <>
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
                <p className="text-3xl font-bold">{formattedMoneySaved}</p>
                <p className="text-sm text-muted-foreground">Économisés</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-primary mr-2" />
              <div>
                <p className="text-3xl font-bold">{timeSavedText}</p>
                <p className="text-sm text-muted-foreground">Économisées</p>
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
            Basé sur {conversations.toLocaleString("fr-CA")} conversations, avec
            un temps moyen de réponse réduit de 12,5 à 1,5 minutes.
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewTab;
