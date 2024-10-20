'use client';

import React from 'react';
import { FoodSampling } from '@/types/food-sampling';
import { formatDateTime } from '@/lib/utils';

interface FoodSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  foodSampling: FoodSampling[] | undefined;
}

const FoodSamplingList: React.FC<FoodSamplingProps> = ({ foodSampling, ...props }) => {
  if (!foodSampling || foodSampling.length === 0) {
    return <p className='text-lg text-neutral-600'>Tidak ada data sampling makanan</p>;
  }

  return (
    <div {...props}>
      <p className='text-2xl font-semibold'>Data Sampling Makanan</p>
      <div className='grid grid-cols-2 gap-4 mt-5'>
        {foodSampling.map((item) => (
          <div key={item.sampling_id} className='flex flex-col'>
            <p className='text-sm'>
              Kuantitas Makanan (gram): {item.food_quantity}
            </p>
            <p className='text-sm'>
              Tanggal: {formatDateTime(item.sample_date)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodSamplingList;
