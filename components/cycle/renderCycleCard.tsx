import { Cycle } from "@/types/cycle";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export const renderCycleCard = (
  cycle: Cycle,
  label: string,
  bgColor: string,
  dateTextColor: string,
  isStopped?: boolean, 
  onStopCycle?: (cycleId: string) => void 
) => (
  <CarouselItem key={cycle.id} className="basis-4/5 pl-1">
    <div>
      <Card
        className={`h-36 ${isStopped ? "bg-gray-500" : bgColor} border-none rounded-2xl relative overflow-hidden`}
      >
        <CardContent className="flex flex-col justify-between p-3 px-4 h-full">
          <div>
            <p className="font-semibold text-white text-lg">
              {isStopped ? "Siklus Dihentikan" : label}
            </p>
            <p className={`font-semibold ${dateTextColor} text-lg -mt-1`}>
              {format(new Date(cycle.start_date), "dd/MM/yy", { locale: id })} -{" "}
              {format(new Date(cycle.end_date), "dd/MM/yy", { locale: id })}
            </p>
          </div>
          {!isStopped && (
            <Button
              size="sm"
              variant="destructive"
              className="w-auto self-end rounded-full text-xs font-semibold mb-1"
              onClick={() => onStopCycle?.(cycle.id)}
            >
              Stop Siklus
            </Button>
          )}
        </CardContent>
        <RefreshCcw
          size={90}
          className="overflow-hidden absolute -left-3 -bottom-5 text-white opacity-20 font-bold"
        />
      </Card>
    </div>
  </CarouselItem>
);
