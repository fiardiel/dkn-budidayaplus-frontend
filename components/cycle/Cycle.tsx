import React from 'react'
import { AddCycle, CycleList } from '@/components/cycle'
import { getProfile } from '@/lib/profile'

const Cycle = async () => {
  const user = await getProfile()
  return (
    <div className="flex flex-col items-center w-full mt-10">
      <AddCycle user={user} className="flex w-[80%] justify-start" />
      <CycleList className="w-full mt-5" />
    </div>
  )
}

export default Cycle
