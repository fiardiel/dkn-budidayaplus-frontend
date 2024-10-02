'use client'

import { renderQualityData } from '@/lib/pond-quality/renderQualityData'
import { PondQuality } from '@/types/pond-quality'
import React from 'react'

interface PondQualityProps extends React.HTMLAttributes<HTMLDivElement> {
  pondQuality: PondQuality | undefined
}

const PondQualityList: React.FC<PondQualityProps> = ({ pondQuality, ...props }) => {
  const qualityData = () => {
    if (!pondQuality) {
      return []
    } else {
      return renderQualityData(pondQuality)
    }
  }

  const waterQuality = qualityData()

  return (
    <div {...props}>
      <p className='text-2xl font-semibold'>Kualitas Air</p>
      <div className='grid grid-cols-2 gap-4 mt-5'>
        {waterQuality.length > 0
          ? waterQuality.map((item) => (
            <div key={item.id} className='flex flex-col'>
              <div className='flex gap-1 items-center'>
                <item.icon size={18} />
                <p className='text-sm'>{item.label}</p>
              </div>
              <p className='text-xl font-semibold text-neutral-600 ml-1 mt-1'> { item.value } </p>
            </div>
          ))
          : (
            <p className='text-lg text-neutral-600'>Tidak ada data kualitas air</p>
          )
        }
      </div>
    </div>
  )
}

export default PondQualityList
