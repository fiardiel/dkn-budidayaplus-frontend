import { FoodSamplingHistory } from '@/components/food-sampling';
import React from 'react';

const FoodSamplingHistoryPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='w-full flex justify-center mb-20 py-10 min-h-[100dvh]'>
      <div className='w-[80%]'>
        <FoodSamplingHistory pondId={params.id} />
      </div>
    </div>
  );
};

export default FoodSamplingHistoryPage;
