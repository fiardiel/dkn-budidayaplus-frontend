import React from 'react'
import { getCycleList } from '@/lib/cycle'
import { CycleCarousel } from '@/components/cycle'

interface CycleListProps extends React.HTMLAttributes<HTMLDivElement> { }

const CycleList: React.FC<CycleListProps> = async ({ ...props }) => {
  const cycleList = await getCycleList()

  return (
    <div {...props}>
      <CycleCarousel cycleList={cycleList} />
    </div>
  )
}

export default CycleList
