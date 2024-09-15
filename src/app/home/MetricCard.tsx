import React, { useRef, useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Progress } from "@radix-ui/react-progress";

const MetricCard = ({
    title,
    value,
    description,
    icon: Icon,
    chartData = null,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("");

    const getPercentageColor = (percentage) => {
        const numericPercentage = parseFloat(percentage.replace(",", "."));
        if (numericPercentage >= 0) return "text-green-500";
        return "text-red-500";
    };

    const percentageMatch = description.match(/([+-]\d+(?:,\d+)?)%/);
    const percentageValue = percentageMatch ? percentageMatch[1] : null;
    const percentageColor = percentageValue
        ? getPercentageColor(percentageValue)
        : "";

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const rotateX = deltaY * 10; // Adjust this value to control the tilt
        const rotateY = -deltaX * 10; // Adjust this value to control the tilt

        setTransform(
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
        );
    };

    const handleMouseLeave = () => {
        setTransform("");
    };

    return (
        <Card
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform,
                transition: "transform 0.1s ease-out",
            }}
            className="cursor-pointer"
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-bold">{value}</div>
                        <p className="text-xs text-muted-foreground">
                            <span className={percentageColor}>
                                {percentageValue}%
                            </span>
                            {description.replace(/[+-]\d+(?:,\d+)?%/, "")}
                        </p>
                    </div>
                    {chartData && title === "Note moyenne" && (
                        <div className="w-16 h-16 relative">
                            <Progress
                                value={parseFloat(value.replace(",", ".")) * 20}
                                className="h-16 w-16 rotate-180"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-bold">
                                    {value}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default MetricCard;
