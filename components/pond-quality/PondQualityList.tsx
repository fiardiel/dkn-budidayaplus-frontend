'use client';

import { renderQualityData } from '@/lib/pond-quality';
import { PondQuality } from '@/types/pond-quality';
import { formatDate } from 'date-fns';
import { id } from 'date-fns/locale';
import React from 'react';
import { Badge } from '../ui/badge'

interface PondQualityProps extends React.HTMLAttributes<HTMLDivElement> {
  pondQuality: PondQuality | undefined;
}

const PondQualityList: React.FC<PondQualityProps> = ({ pondQuality, ...props }) => {
  const waterQuality = pondQuality ? renderQualityData(pondQuality) : [];

  return (
    <div {...props} data-testid='pond-quality-list'>
      {pondQuality ? (
        <div className='mt-5'>
          <div className='text-gray-500'>
            <div className='flex'>
              <p className='font-semibold'>Laporan terakhir</p>
              <Badge className='ml-2 bg-[#2154C5]'>
                {pondQuality.reporter.first_name} {pondQuality.reporter.last_name}
              </Badge>
            </div>
            <p> {formatDate(pondQuality.recorded_at, 'EEEE, dd MMMM yyyy', { locale: id })} </p>
          </div>
          <div className='grid grid-cols-2 gap-3 mt-4'>
            {waterQuality.map((item) => (
              <div key={item.id} className='flex flex-col'>
                <div className='flex gap-1 items-center'>
                  <item.icon size={18} />
                  <p className='text-sm'>{item.label}</p>
                </div>
                <p className='text-xl font-semibold text-neutral-600 ml-1 mt-1'> {item.value} </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='mt-5'>
          <p className='text-lg text-neutral-600'>Tidak ada data kualitas air</p>
        </div>
      )}
    </div>
  );
};

export default PondQualityList;
