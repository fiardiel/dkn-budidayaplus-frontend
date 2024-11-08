'use client'

import React from 'react'
import { AddPondQuality, PondQualityList, ViewPondQualityHistory } from '@/components/pond-quality'
import { usePondQuality } from '@/hooks/usePondQuality'

interface PondQualityProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string
}

const PondQuality: React.FC<PondQualityProps> = ({ pondId, ...props }) => {
  const { pondQuality, cycle } = usePondQuality(pondId)
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