'use client'

import React from 'react';
import { formatDateTime } from '@/lib/utils';
import { FoodSampling } from '@/types/food-sampling';

interface FoodSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  foodSampling: FoodSampling[] | undefined;
}

const FoodSamplingList: React.FC<FoodSamplingProps> = ({ foodSampling, ...props }) => {
  const samplingData = () => {
    if (!foodSampling || foodSampling.length === 0) {
      return [];
    } else {
      return foodSampling.map((item) => ({
        id: item.sampling_id,
        foodQuantity: item.food_quantity,
        sampleDate: formatDateTime(item.sample_date),
      }));
    }
  };

  const formattedData = samplingData();

  return (
    <div {...props}>
      <p className='text-2xl font-semibold'>Data Sampling Makanan</p>
      {formattedData.length > 0 ? (
        <div className='grid grid-cols-2 gap-4 mt-5'>
          {formattedData.map((item) => (
            <div key={item.id} className='flex flex-col'>
              <div className='flex gap-1 items-center'>
                <p className='text-sm' data-testid="food-quantity">Kuantitas Makanan (gram): {item.foodQuantity}</p>
              </div>
              <p className='text-sm' data-testid="sample-date">Tanggal: {item.sampleDate}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-lg text-neutral-600'>Tidak ada data sampling makanan</p>
      )}
    </div>
  );
};

export default FoodSamplingList;
