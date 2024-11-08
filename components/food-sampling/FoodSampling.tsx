'use client'

import React from 'react';
import { AddFoodSampling, FoodSamplingList, ViewFoodSamplingHistory } from '@/components/food-sampling';
import { useFoodSampling } from '@/hooks/useFoodSampling';

interface FoodSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
}

const FoodSampling: React.FC<FoodSamplingProps> = ({ pondId, ...props }) => {
  const { foodSampling, cycle } = useFoodSampling(pondId);

  return (
    <div {...props}>
      <div>
        <p className='text-2xl font-medium'>Data Sampling Makanan</p>
        {cycle && (
          <div className='flex gap-1 items-center mt-2'>
            <AddFoodSampling pondId={pondId} cycleId={cycle.id} data-testid="add-food-sampling" />
            <ViewFoodSamplingHistory pondId={pondId} data-testid="view-food-sampling-history" />
          </div>
        )}
      </div>
      <FoodSamplingList foodSampling={foodSampling} data-testid="food-sampling-list" />
    </div>
  );
};

export default FoodSampling;
