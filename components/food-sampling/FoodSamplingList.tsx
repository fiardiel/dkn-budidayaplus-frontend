'use client'

import React from 'react';
import { renderSamplingData } from '@/lib/food-sampling';
import { FoodSampling } from '@/types/food-sampling';
import { Package, Calendar } from 'lucide-react';

interface FoodSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  foodSampling: FoodSampling | undefined;
}

const FoodSamplingList: React.FC<FoodSamplingProps> = ({ foodSampling, ...props }) => {
  const samplingData = foodSampling ? renderSamplingData(foodSampling) : [];

  return (
    <div {...props} data-testid='food-sampling-list'>
      {foodSampling ? (
        <div className='mt-5'>
          <div className='grid grid-cols-2 gap-3 mt-4'>
            {samplingData.map((item) => (
              <div key={item.id} className='flex flex-col'>
                <div className='flex gap-1 items-center'>
                  <Package size={18} />
                  <p className='text-sm'>{item.label || 'Kuantitas Makanan (gram)'}</p>
                </div>
                <p className='text-xl font-semibold text-neutral-600 ml-1 mt-1'>{item.value}</p>
                <div className='flex gap-1 items-center mt-1'>
                  <Calendar size={18} />
                  <p className='text-sm'>Tanggal: {item.sampleDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='mt-5'>
          <p className='text-lg text-neutral-600'>Tidak ada data sampling makanan</p>
        </div>
      )}
    </div>
  );
};

export default FoodSamplingList;
