import { z } from 'zod';

export const FishSamplingInputSchema = z.object({
    fish_length: z.number().positive({ message: 'Panjang harus berupa angka positif' }),
    fish_weight: z.number().positive({ message: 'Lebar harus berupa angka positif' }),
});

export type FishSamplingInputForm = z.infer<typeof FishSamplingInputSchema>;