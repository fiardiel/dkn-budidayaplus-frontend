import React from 'react';
import { FoodSampling } from '@/types/food-sampling';
import { Package } from 'lucide-react';
import { id } from 'date-fns/locale';
import { formatDate } from 'date-fns';

interface FoodSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  foodSampling: FoodSampling | undefined;
}

const FoodSamplingList: React.FC<FoodSamplingProps> = ({ foodSampling, ...props }) => {
  return (
    <div {...props} data-testid='food-sampling-list'>
      {foodSampling ? (
        <div className='mt-5'>
          <p className='text-gray-500' data-testid='fish-sample-date'> Laporan terakhir: {formatDate(foodSampling.recorded_at, 'EEEE, dd MMMM yyyy', { locale: id })}</p>
          <div className='grid grid-cols-2 gap-3 mt-4'>
            <div className='flex flex-col'>
              <div className='flex gap-1 items-center'>
                <Package size={18} />
                <p className='text-sm'>Kuantitas (gram)</p>
              </div>
              <p className='text-xl font-semibold text-neutral-600 ml-1 mt-1'>{foodSampling.food_quantity} gr</p>
            </div>
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
