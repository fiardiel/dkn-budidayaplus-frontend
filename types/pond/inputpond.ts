import { z } from 'zod';

export const PondInputSchema = z.object({
  name: z.string().min(1, { message: 'Nama Kolam harus diisi' }),
  image_name: z.string().min(1, { message: 'Nama Gambar harus diisi' }),
  length: z.number().positive({ message: 'Panjang harus berupa angka positif' }),
  width: z.number().positive({ message: 'Lebar harus berupa angka positif' }),
  depth: z.number().positive({ message: 'Kedalaman harus berupa angka positif' }),
});

export type PondInputForm = z.infer<typeof PondInputSchema>;
