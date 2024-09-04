"use client";

import { RadialBar, RadialBarChart, PolarRadiusAxis } from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../componentsUi/ui/card";

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
            description.startsWith("+") ? "text-green-500" : "text-red-500"
          }`}
        >
          {description}
        </p>
      </div>
      {chartData && (
        <div className="w-16 h-16">
          <RadialBarChart
            width={100}
            height={100}
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="90%"
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <PolarRadiusAxis tick={false} />
            <RadialBar
              background
              clockWise
              dataKey="value"
              cornerRadius={5}
              fill="var(--primary)"
            />
          </RadialBarChart>
        </div>
      )}
    </CardContent>
  </Card>
);

export default MetricCard;
