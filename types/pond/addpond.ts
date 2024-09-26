import { z } from 'zod';

export const PondAddSchema = z.object({
  name: z.string().min(1, "Nama kolam tidak boleh kosong"),
  image_name: z.string().min(1, "Nama gambar tidak boleh kosong"),
  volume: z.number().positive("Volume kolam harus lebih dari 0"),
});

export type PondAddForm = z.infer<typeof PondAddSchema>;
