import React from 'react';
import FishSamplingHistory from '@/components/fish-sampling/FishSamplingHistory';

const FishSamplingHistoryPage = ({ params }: { params: { id: string } }) => {

  return (
    <div className='py-10 pb-20'>
      <FishSamplingHistory pondId={params.id} />
    </div>
  );
};

export default FishSamplingHistoryPage;
