'use client'

import React from 'react'
import { FishSamplingList, AddFishSampling } from '@/components/fish-sampling'
import { useLatestFishSampling } from '@/hooks/useFishSampling'
import { Button } from '../ui/button'
import Link from 'next/link'
import { History } from 'lucide-react'

interface FishSamplingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string
}

const FishSamplingCard:React.FC<FishSamplingCardProps> = ({pondId, ...props}) => {
  const fishSampling = useLatestFishSampling(pondId)
  return (
    <div {...props}>
      <FishSamplingList fishSampling={fishSampling} />
          
      <div className="flex gap-2 mt-4">
        <AddFishSampling pondId={pondId} />
        <Button asChild className='bg-[#4682B4]'>
          <Link href={`/pond/${pondId}/fish-sampling`}>
            Sampling History <History size={20} className="ml-1" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default FishSamplingCard