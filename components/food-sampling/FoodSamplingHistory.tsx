import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FoodSamplingHistoryTableHeaders } from '@/components/food-sampling';
import { formatDate } from 'date-fns';
import { getLatestCycle } from '@/lib/cycle';
import { getFoodSamplingHistory } from '@/lib/food-sampling';
import { FoodSamplingHistory as FoodSamplingHistoryType } from '@/types/food-sampling';
import { id } from 'date-fns/locale';

interface FoodSamplingHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
  pondId: string;
}

const FoodSamplingHistory: React.FC<FoodSamplingHistoryProps> = async ({ pondId, ...props }) => {
  const cycle = await getLatestCycle();
  const foodSamplingHistory: FoodSamplingHistoryType = cycle ? await getFoodSamplingHistory(cycle.id, pondId) : { food_samplings: [], cycle_id: '' };

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
          {foodSamplingHistory.food_samplings.length !== 0 ? (
            foodSamplingHistory.food_samplings.map((item) => (
              <TableRow key={item.sampling_id}>
                <TableCell>
                  <p>{formatDate(item.recorded_at, 'EEEE, dd MMMM yyyy', { locale: id })}</p>
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
