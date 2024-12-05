import React from 'react';
import { getPondQualityHistory } from '@/lib/pond-quality';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/components/pond-quality';
import { Waves } from 'lucide-react';

interface PondQualityHistoryProps {
  pondId: string;
}

const PondQualityHistory: React.FC<PondQualityHistoryProps> = async ({ pondId }) => {
  const result = await getPondQualityHistory(pondId);
  const history = result.pond_qualities;

  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div className="w-[80%] flex gap-4">
          <Waves className="w-10 h-10 text-[#2154C5]" />
          <p className="w-full text-start text-3xl font-semibold">Riwayat Kualitas Kolam</p>
        </div>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={history} />
      </div>
    </div>
  );
};

export default PondQualityHistory;

