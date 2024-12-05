import { FoodSamplingHistory } from '@/components/food-sampling';
import React from 'react';

const FoodSamplingHistoryPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='w-full pb-20 py-10'>
      <FoodSamplingHistory pondId={params.id} />
    </div>
  );
};

export default FoodSamplingHistoryPage;
