'use client'

import React from 'react'
import { FishSamplingList, AddFishSampling } from '@/components/fish-sampling'
import { useLatestFishSampling } from '@/hooks/useFishSampling'

interface FishSamplingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string
}

const FishSamplingCard:React.FC<FishSamplingCardProps> = ({pondId, ...props}) => {
  const fishSampling = useLatestFishSampling(pondId)
  return (
    <div {...props}>
      <FishSamplingList fishSampling={fishSampling} />
          
      <div className="mt-4">
        <AddFishSampling pondId={pondId} />
      </div>
    </div>
  )
}

export default FishSamplingCard