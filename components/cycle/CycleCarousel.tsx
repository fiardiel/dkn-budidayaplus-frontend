'use client'

import { CycleList } from '@/types/cycle';
import React, { useState } from 'react';
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { renderCycleCard } from '@/components/cycle/renderCycleCard';
import { stopCycle } from "@/lib/cycle";

interface CycleCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  cycleList: CycleList;
}

const CycleCarousel: React.FC<CycleCarouselProps> = ({ cycleList }) => {
  const [localCycleList, setLocalCycleList] = useState<CycleList>(cycleList);

  const handleStopCycle = async (cycleId: string) => {
    const result = await stopCycle(cycleId);
    if (result.success) {
      const stoppedCycle = localCycleList.active.find(cycle => cycle.id === cycleId);
      if (stoppedCycle) {
        setLocalCycleList(prevState => ({
          ...prevState,
          active: prevState.active.filter(cycle => cycle.id !== cycleId),
          stopped: [...prevState.stopped, { ...stoppedCycle }],
        }));
      }
    } else {
      alert(result.message);
    }
  };

  const totalLength =
    localCycleList.active.length +
    localCycleList.past.length +
    localCycleList.future.length +
    localCycleList.stopped.length;

  return (
    <Carousel
      opts={{
        startIndex: localCycleList.past.length,
      }}
      className="max-w-full"
    >
      <CarouselContent
        className={cn(totalLength > 1 ? 'justify-start' : 'justify-center')}
      >
        {localCycleList.past.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Lalu',
            'bg-slate-500',
            'text-slate-400'
          )
        )}
        {localCycleList.active.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Aktif',
            'bg-primary-600',
            'text-primary-300',
            false,
            handleStopCycle
          )
        )}
        {localCycleList.future.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Mendatang',
            'bg-slate-500',
            'text-slate-400'
          )
        )}
        {localCycleList.stopped.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Dihentikan',
            'bg-gray-500',
            'text-gray-300',
            true
          )
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default CycleCarousel;
