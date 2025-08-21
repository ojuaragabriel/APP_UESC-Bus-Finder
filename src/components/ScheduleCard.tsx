"use client";

import type { BusSchedule } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Bus, MapPin, Route, Building, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

interface ScheduleCardProps {
  schedule: BusSchedule;
  currentTime: Date;
  isNext: boolean;
}

type TimeStatus = {
  label: string;
  // mantendo seu tipo, mas lembre: o <Badge> abaixo usa `variant="outline"` e classes custom
  variant: "default" | "destructive" | "secondary" | "accent";
  state: "passed" | "imminent" | "upcoming";
};

export default function ScheduleCard({ schedule, currentTime, isNext }: ScheduleCardProps) {
  const timeStatus = useMemo<TimeStatus>(() => {
    // Evita ISO/fuso: monta a data de hoje e acerta horas/minutos
    const [hh, mm] = (schedule.hora ?? "00:00").split(":").map(Number);
    const scheduleDateTime = new Date(currentTime); // cópia
    scheduleDateTime.setHours(hh || 0, mm || 0, 0, 0);

    // Se passou de muito (ex.: mais de 12h atrás), assume próximo dia (ex.: 23:50 -> 00:10)
    if (scheduleDateTime.getTime() - currentTime.getTime() < -12 * 60 * 60 * 1000) {
      scheduleDateTime.setDate(scheduleDateTime.getDate() + 1);
    }

    const diffMinutes = Math.round((scheduleDateTime.getTime() - currentTime.getTime()) / (1000 * 60));

    if (diffMinutes < -60) {
      return { label: "", variant: "secondary", state: "passed" };
    }
    if (diffMinutes < -1) {
      return { label: `Passou há ${Math.abs(diffMinutes)} min`, variant: "secondary", state: "passed" };
    }
    if (diffMinutes <= 2) {
      return { label: "Agora", variant: "accent", state: "imminent" };
    }
    if (diffMinutes <= 60) {
      return { label: `Em ${diffMinutes} min`, variant: "default", state: "upcoming" };
    }
    return { label: "", variant: "default", state: "upcoming" };
  }, [schedule.hora, currentTime]);

  const cardClasses = cn(
    "transition-all duration-300 rounded-xl border-2",
    isNext ? "border-[#7c3aed] shadow-lg" : "border-muted",
  );

  const badgeClasses = cn({
    "bg-accent text-accent-foreground": timeStatus.variant === "accent",
    "bg-primary/80 text-primary-foreground": timeStatus.variant === "default" && !!timeStatus.label,
    "bg-muted text-muted-foreground": timeStatus.variant === "secondary" && !!timeStatus.label,
  });

  return (
    <Card className={cardClasses}>
      <CardContent className="p-2 grid grid-cols-3 gap-2 items-center">
        <div className="col-span-1 flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1 font-bold text-lg md:text-xl text-primary">
            <Clock className="h-5 w-5" />
            <span>{schedule.hora}</span>
          </div>

          {schedule.chegadaPrevista && (
            <div className="flex items-center text-[10px] text-muted-foreground mt-0.5" title="Chegada prevista">
              <CheckCircle className="h-2.5 w-2.5 mr-1" />
              ~{schedule.chegadaPrevista}
            </div>
          )}

          {timeStatus.label && (
            <Badge variant="outline" className={cn("mt-1", badgeClasses)}>
              {timeStatus.label}
            </Badge>
          )}
        </div>

        <div className="col-span-2 space-y-1 text-xs">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary/80" />
            <div>
              <span className="font-medium">Origem:</span> {schedule.origem}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Route className="h-3.5 w-3.5 text-primary/80" />
            <div>
              <span className="font-medium">Via:</span> {schedule.via}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Bus className="h-3.5 w-3.5 text-primary/80" />
            <div>
              <span className="font-medium">Linha:</span> {schedule.linha} ({schedule.empresa})
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <Building className="h-3.5 w-3.5 text-primary/80" />
            <div>
              <span className="font-medium">Destino:</span> {schedule.destino}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
