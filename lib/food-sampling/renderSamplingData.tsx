import { FoodSampling } from '@/types/food-sampling';

export const renderSamplingData = (foodSampling: FoodSampling) => {
    return [{
        sampling_id: foodSampling.sampling_id,
        food_quantity: foodSampling.food_quantity,
        sample_date: foodSampling.sample_date
    }];
};