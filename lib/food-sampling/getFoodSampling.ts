import { FoodSampling } from '@/types/food-sampling';

export async function getFoodSampling(pondId: string, cycleId: string): Promise<FoodSampling[]> {
  return [
    {
      sampling_id: 'sample1',
      pond: pondId,
      reporter: '082299442770',
      cycle: cycleId,
      food_quantity: 100,
      sample_date: new Date('2024-10-01'),
    },
    {
      sampling_id: 'sample2',
      pond: pondId,
      reporter: '082299442771',
      cycle: cycleId,
      food_quantity: 200,
      sample_date: new Date('2024-10-02'),
    },
  ];
}
