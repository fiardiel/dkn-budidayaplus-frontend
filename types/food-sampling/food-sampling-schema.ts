import { z } from 'zod';

export const FoodSamplingSchema = z.object({
    food_quantity: z.number().positive({ message: 'Kuantitas makanan harus berupa angka positif' }),
});

export type FoodSamplingInputForm = z.infer<typeof FoodSamplingSchema>;