'use client'

import { CycleList } from '@/types/cycle';
import React from 'react';
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel";
import { renderCycleCard } from '@/components/cycle';
import { cn } from '@/lib/utils';

interface CycleCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  cycleList: CycleList;
}

const CycleCarousel: React.FC<CycleCarouselProps> = ({ cycleList }) => {
  return (
    <Carousel
      opts={{
        startIndex: cycleList.past.length + cycleList.stopped.length
      }}
      className="max-w-full"
    >
      <CarouselContent className={cn(
        '-ml-1',
        (cycleList.past.length
          + cycleList.stopped.length
          + cycleList.active.length
          + cycleList.future.length) <= 1 ? 'justify-center' : 'justify-start'
      )}>
        {cycleList.past.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Lalu',
            'bg-slate-500',
            'text-slate-400'
          )
        )}
        {cycleList.stopped.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Dihentikan',
            'bg-slate-500',
            'text-slate-400',
          )
        )}
        {cycleList.active.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Aktif',
            'bg-primary-700',
            'text-primary-300',
          )
        )}
        {cycleList.future.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Mendatang',
            'bg-slate-500',
            'text-slate-400'
          )
        )}
      </CarouselContent>
    </Carousel>
  );
};

export default CycleCarousel;
