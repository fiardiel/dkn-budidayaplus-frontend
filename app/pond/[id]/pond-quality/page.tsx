import { PondQualityHistory } from '@/components/pond-quality'
import React from 'react'

const PondQualityHistoryPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='w-full flex justify-center mb-20 py-10 min-h-[100dvh]'>
      <div className='w-[80%]'>
        <PondQualityHistory pondId={params.id} />
      </div>
    </div>
  )
}

export default PondQualityHistoryPage
