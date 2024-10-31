import React from 'react';
import FishSamplingHistory from '@/components/fish-sampling/FishSamplingHistory';

const FishSamplingHistoryPage = ({ params }: { params: {id: string }}) => {
  
  return <FishSamplingHistory pondId={params.id} />;
};

export default FishSamplingHistoryPage;