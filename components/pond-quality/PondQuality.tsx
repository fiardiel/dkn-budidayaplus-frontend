import React from 'react'
import { AddPondQuality, PondQualityList, ViewPondQualityHistory } from '@/components/pond-quality'
import { getLatestPondQuality } from '@/lib/pond-quality'
import { getLatestCycle } from '@/lib/cycle'

interface PondQualityProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string
}

const PondQuality: React.FC<PondQualityProps> = async ({ pondId, ...props }) => {
  const fetchCycle = async () => {
    try {
      const res = await getLatestCycle()
      return res
    } catch (error) {
      return undefined
    }
  }

  const fetchLatestPondQuality = async (pondId: string, cycleId: string) => {
    try {
      const res = await getLatestPondQuality(pondId, cycleId)
      return res
    } catch (error) {
      return undefined
    }
  }

  const cycle = await fetchCycle()
  const pondQuality = cycle && await fetchLatestPondQuality(pondId, cycle.id)

  return (
    <div {...props}>
      <div>
        <p className='text-2xl font-medium'>Kualitas Air</p>
        {cycle && (
          <div className='flex gap-1 items-center mt-2'>
            <AddPondQuality pondId={pondId} cycleId={cycle.id} />
            <ViewPondQualityHistory pondId={pondId} />
          </div>
        )}
      </div>
      <PondQualityList pondQuality={pondQuality} />
    </div>
  )
}

export default PondQuality
