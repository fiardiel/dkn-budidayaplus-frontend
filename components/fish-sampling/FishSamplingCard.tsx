import React from 'react'
import { FishSamplingList, AddFishSampling } from '@/components/fish-sampling'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { History } from 'lucide-react'
import { fetchFishSampling } from '@/hooks/non-state/fetchFishSampling'

interface FishSamplingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string
  cycleId?: string
}

const FishSamplingCard: React.FC<FishSamplingCardProps> = async ({ pondId, cycleId, ...props }) => {
  const fishSampling = cycleId ? await fetchFishSampling(pondId, cycleId) : undefined
  console.log('cycle id nya', cycleId)

  return (
    <div {...props}>
      <p className='text-2xl font-medium'> Sampling Ikan </p>
      <div className="flex gap-2 mt-4">
        <AddFishSampling pondId={pondId} cycleId={cycleId} />
        <Button size={'sm'} variant={'outline'} asChild>
          <Link href={`/pond/${pondId}/fish-sampling`}>
            Lihat Riwayat <History size={20} className="ml-1" />
          </Link>
        </Button>
      </div>
      <FishSamplingList className='mt-5' fishSampling={fishSampling} />
    </div>
  )
}

export default FishSamplingCard
