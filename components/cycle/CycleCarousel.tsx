'use client'

import { CycleList } from '@/types/cycle'
import React from 'react'

interface CycleCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  cycleList: CycleList
}

const CycleCarousel: React.FC<CycleCarouselProps> = ({ cycleList }) => {
  return (
    <div>

    </div>
  )
}

export default CycleCarousel
