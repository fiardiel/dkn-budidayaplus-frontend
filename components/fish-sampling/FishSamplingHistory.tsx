'use client';

import React from 'react';
import { useFishSamplingHistory } from '@/hooks/useFishSamplingHistory';
import { Calendar, Dumbbell, Ruler } from 'lucide-react';

interface FishSamplingHistoryProps {
  pondId: string;
}

const FishSamplingHistory: React.FC<FishSamplingHistoryProps> = ({ pondId }) => {
  const initialHistory = useFishSamplingHistory(pondId);

  return (
    <div className="flex w-full justify-center">
      <div className="overflow-y-auto h-screen px-4 py-2 pt-28 scroll-mt-20 w-[80%]">
        <h2 className="text-3xl font-semibold mb-4">Fish Sampling History</h2>
        {!initialHistory || initialHistory.fish_samplings.length == 0 ? (
          <p>No sampling history available.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  <div className='flex item-center gap-2'> <Dumbbell size={18} />
                    <p className='flex gap-1'><span className="hidden sm:block">Weight</span>(kg)</p>
                  </div>
                </th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  <div className='flex item-center gap-2'> <Ruler size={18} />
                    <p className='flex gap-1'><span className="hidden sm:block">Length</span>(cm)</p>
                  </div>
                </th>
                <th className="px-4 py-2 text-left font-semibold text-gray-700">
                  <div className='flex item-center gap-2'> <Calendar size={18} />
                    <p>Date</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {initialHistory.fish_samplings.map((sampling) => (
                <tr key={sampling.sampling_id} className="border-b">
                  <td className="px-4 py-2">{sampling.fish_weight}</td>
                  <td className="px-4 py-2">{sampling.fish_length}</td>
                  <td className="px-4 py-2">{new Date(sampling.recorded_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FishSamplingHistory;
