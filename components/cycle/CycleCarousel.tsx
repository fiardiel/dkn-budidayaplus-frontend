'use client'

import { CycleList } from '@/types/cycle'
import React from 'react'
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel"
import { cn } from '@/lib/utils'
import { renderCycleCard } from '@/components/cycle/renderCycleCard'

interface CycleCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  cycleList: CycleList
}

const CycleCarousel: React.FC<CycleCarouselProps> = ({ cycleList }) => {
  const totalLength = cycleList.active.length + cycleList.past.length + cycleList.future.length

  return (
    <Carousel
      opts={{
        startIndex: cycleList.past.length
      }}
      className="max-w-full"
    >
      <CarouselContent className={cn(
        totalLength > 1 ? 'justify-start' : 'justify-center'
      )}>
        {cycleList.past.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Lalu',
            'bg-slate-500',
            'text-slate-400'
          )
        )}
        {cycleList.active.map((cycle) =>
          renderCycleCard(
            cycle,
            'Siklus Aktif',
            'bg-primary-600',
            'text-primary-300'
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
      </CarouselContent >
    </Carousel >
  )
}

export default CycleCarousel
