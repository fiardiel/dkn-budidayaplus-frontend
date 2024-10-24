import { z } from 'zod';

export const FoodSamplingSchema = z.object({
  food_quantity: z.number().positive('Kuantitas makanan harus berupa angka positif'),
});

export type FoodSamplingInput = z.infer<typeof FoodSamplingSchema>;