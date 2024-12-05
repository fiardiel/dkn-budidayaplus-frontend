import React from 'react';
import { fetchFishSamplingHistory } from '@/lib/fish-sampling';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/fish-sampling';
import { History } from 'lucide-react';

interface FishSamplingHistoryProps {
  pondId: string;
}

const FishSamplingHistory: React.FC<FishSamplingHistoryProps> = async ({ pondId }) => {
  const result = await fetchFishSamplingHistory(pondId);
  const history = result.fish_samplings

  return (
    <div className='w-full'>
      <div className='flex justify-center'>
        <div className='w-[80%] flex gap-4'>
          <History className='w-10 h-10 text-[#2154C5]' />
          <p className='w-full text-start text-3xl font-semibold'>Riwayat Sampling Ikan</p>
        </div>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={history} />
      </div>
    </div>
  );
};

export default FishSamplingHistory;
