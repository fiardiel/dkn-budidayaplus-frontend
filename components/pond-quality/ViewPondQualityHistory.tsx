import React from 'react'
import { Button } from '@/components/ui/button'
import { History } from 'lucide-react'
import Link from 'next/link'

interface ViewPondQualityHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string
}

const ViewPondQualityHistory: React.FC<ViewPondQualityHistoryProps> = ({ pondId, ...props }) => {
  return (
    <div {...props} data-testid='view-pond-quality-history'>
      <Button variant={'outline'} size={'sm'} asChild>
        <Link href={`/pond/${pondId}/pond-quality`}>
          Lihat Riwayat <History className='ml-2' size={16} />
        </Link>
      </Button>
    </div>
  )
}

export default ViewPondQualityHistory
