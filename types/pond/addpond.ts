import { z } from 'zod';

export const PondAddSchema = z.object({
  name: z.string().min(1, { message: 'Nama Kolam is required' }),
  image_name: z.string().min(1, { message: 'Nama Gambar is required' }),
  length: z.number().min(1, { message: 'Panjang is required' }),
  width: z.number().min(1, { message: 'Lebar is required' }),
  height: z.number().min(1, { message: 'Tinggi is required' }),
  volume: z.number(), // This will be calculated dynamically
});

export type PondAddForm = z.infer<typeof PondAddSchema>;
