'use client'

import React from 'react'
import { FoodSamplingList, AddFoodSampling } from '@/components/food-sampling'
import { useFoodSampling } from '@/hooks/useFood'
import { Button } from '../ui/button'
import { FoodSampling } from '@/types/food-sampling'

interface FishSamplingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string
}

const FishSamplingCard:React.FC<FishSamplingCardProps> = ({pondId, ...props}) => {
  const foodSampling = useFoodSampling(pondId)
  if (foodSampling) {
    const foodSamplingList: Array<FoodSampling> = [foodSampling]
  

    return (
      <div {...props}>
        <FoodSamplingList foodSampling={foodSamplingList} />
        <div className="flex gap-2 mt-4">
          <AddFoodSampling pondId={pondId} />
          <Button asChild className='bg-[#4682B4]'>
          </Button>
        </div>
      </div>
    )
  }
}

export default FishSamplingCard