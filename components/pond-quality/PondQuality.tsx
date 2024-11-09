import React from 'react'
import { AddPondQuality, PondQualityList, ViewPondQualityHistory } from '@/components/pond-quality'
import { fetchCycle } from '@/hooks/non-state/fetchCycle'
import { fetchPondQuality } from '@/hooks/non-state/fetchPondQuality'

interface PondQualityProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string
}

const PondQuality: React.FC<PondQualityProps> = async ({ pondId, ...props }) => {
  const cycle = await fetchCycle()
  const pondQuality = cycle && await fetchPondQuality(pondId, cycle.id)

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
