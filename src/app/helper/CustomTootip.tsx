import { TooltipProps } from "recharts";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../components/popover";

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

export default CustomTooltip;
