'use client';

import { FishSampling } from '@/types/fish-sampling';
import { formatDate } from 'date-fns';
import { id } from 'date-fns/locale';
import { Dumbbell, Ruler } from 'lucide-react';
import React from 'react';

interface FishSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  fishSampling: FishSampling | undefined;
}

const FishSamplingList: React.FC<FishSamplingProps> = ({ fishSampling, ...props }) => {
  return (
    <div {...props}>
      {fishSampling ? (
        <div>
          <p className='text-gray-500' data-testid='fish-sample-date'> Laporan terakhir: {formatDate(fishSampling.recorded_at, 'EEEE, dd MMMM yyyy', { locale: id })}</p>
          <div className='grid grid-cols-2 mt-4'>
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <Dumbbell size={18} /> Berat (kg)
              </div>
              <p className='text-xl font-semibold text-neutral-600' data-testid="fish-weight">{fishSampling.fish_weight}</p>
            </div>
            <div className='flex flex-col'>
              <div className='flex gap-2'>
                <Ruler size={18} /> Panjang (cm)
              </div>
              <p className='text-xl font-semibold text-neutral-600' data-testid="fish-length">{fishSampling.fish_length}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className='text-lg text-neutral-600'>Tidak ada sampling ikan</p>
      )}
    </div>
  );
};

export default FishSamplingList;
