import { FoodSampling } from '@/types/food-sampling';
import { formatDateTime } from '@/lib/utils';

export const renderSamplingData = (foodSampling: FoodSampling) => [
  {
    id: foodSampling.sampling_id,
    label: 'Kuantitas Makanan (gram)', 
    value: foodSampling.food_quantity,
    sampleDate: formatDateTime(foodSampling.sample_date),
  },
];
