import { z } from 'zod';

export const FoodSamplingSchema = z.object({
  food_quantity: z
    .number()
    .positive('Kuantitas makanan harus berupa angka positif'),
  sample_date: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Tanggal sampel tidak valid',
    }),
});

export type FoodSamplingInput = z.infer<typeof FoodSamplingSchema>;