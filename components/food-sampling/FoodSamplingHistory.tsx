'use client'

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FoodSamplingHistoryTableHeaders } from '@/components/food-sampling';
import { useFoodSamplingHistory } from '@/hooks/useFoodSamplingHistory';
import { formatDate } from 'date-fns';

interface FoodSamplingHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
}

const FoodSamplingHistory: React.FC<FoodSamplingHistoryProps> = ({ pondId, ...props }) => {
  const foodSamplingHistory = useFoodSamplingHistory(pondId);

  return (
    <div {...props}>
      <p className='font-medium text-2xl'>Riwayat Sampling Makanan</p>
      <Table className='mt-5'>
        <TableHeader>
          <TableRow>
            {FoodSamplingHistoryTableHeaders.map((item) => (
              <TableHead key={item.id}>
                <div className='flex items-center gap-1'>
                  <item.icon size={20} /> {item.title}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {foodSamplingHistory && foodSamplingHistory.food_samples.length !== 0 ? (
            foodSamplingHistory.food_samples.map((item) => (
              <TableRow key={item.sampling_id}>
                <TableCell>
                  <p>{formatDate(item.sample_date, 'dd-MM-yyyy')}</p>
                </TableCell>
                <TableCell>
                  <p>{item.food_quantity}</p>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>Tidak ada data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FoodSamplingHistory;
