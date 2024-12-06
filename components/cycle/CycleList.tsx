import React from 'react'
import { getCycleList } from '@/lib/cycle'
import { CycleCarousel } from '@/components/cycle'
import { Profile } from '@/types/profile'

interface CycleListProps extends React.HTMLAttributes<HTMLDivElement> {
  user?: Profile
}

const CycleList: React.FC<CycleListProps> = async ({ user, ...props }) => {
  const cycleList = await getCycleList()

  return (
    <div {...props}>
      <CycleCarousel user={user} cycleList={cycleList} />
    </div>
  )
}

export default CycleList
