import React from 'react'
import { Button } from '@/components/ui/button'
import { History } from 'lucide-react'
import Link from 'next/link'

interface ViewFoodSamplingHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string
}

const ViewFoodSamplingHistory: React.FC<ViewFoodSamplingHistoryProps> = ({ pondId, ...props }) => {
  return (
    <div {...props} data-testid='view-pond-quality-history'>
      <Button variant={'outline'} size={'sm'} asChild>
        <Link href={`/pond/${pondId}/food-sampling`}>
          Lihat Riwayat <History className='ml-2' size={16} />
        </Link>
      </Button>
    </div>
  )
}

export default ViewFoodSamplingHistory
