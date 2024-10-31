'use client';

import { FishSampling } from '@/types/fish-sampling';
import React from 'react';

interface FishSamplingProps extends React.HTMLAttributes<HTMLDivElement> {
  fishSampling: FishSampling | undefined;
}

const FishSamplingList: React.FC<FishSamplingProps> = ({ fishSampling, ...props }) => {
  return (
    <div {...props}>
      <p className='text-2xl font-semibold'>Sampling Ikan</p>
      {fishSampling ? (
        <table className='mt-5 table-auto w-full'>
          <thead>
            <tr>
              <th className='text-left text-lg'>Berat Ikan (kg)</th>
              <th className='text-left text-lg'>Panjang Ikan (cm)</th>
              <th className='text-left text-lg'>Tanggal Sampling</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-xl font-semibold text-neutral-600' data-testid="fish-weight">{fishSampling.fish_weight}</td>
              <td className='text-xl font-semibold text-neutral-600' data-testid="fish-length">{fishSampling.fish_length}</td>
              <td className='text-xl font-semibold text-neutral-600' data-testid="fish-sample-date">{fishSampling.sample_date}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className='text-lg text-neutral-600 mt-5'>Tidak ada sampling ikan</p>
      )}
    </div>
  );
};

export default FishSamplingList;