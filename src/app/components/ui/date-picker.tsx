"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "../../lib/util";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../../@/components/ui/popover";
import { Button } from "../../../../@/components/ui/button";
import { Calendar } from "../../../../@/components/ui/calendar";

export function DatePickerWithRange({
    className,
}: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    });

    const handleSelect = (newDate: DateRange | undefined) => {
        setDate(newDate);

        if (newDate?.from && newDate.to) {
            const fromDate = format(newDate.from, "PPP", { locale: fr });
            const toDate = format(newDate.to, "PPP", { locale: fr });
            console.log(
                `Plage de dates sélectionnée : ${fromDate} - ${toDate}`
            );
        } else if (newDate?.from) {
            const fromDate = format(newDate.from, "PPP", { locale: fr });
            console.log(`Date sélectionnée : ${fromDate}`);
        } else {
            console.log("Aucune date sélectionnée");
        }
    };

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "PPP", { locale: fr })} -{" "}
                                    {format(date.to, "PPP", { locale: fr })}
                                </>
                            ) : (
                                format(date.from, "PPP", { locale: fr })
                            )
                        ) : (
                            <span>Sélectionner une plage de dates</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        locale={fr}
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={handleSelect}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
