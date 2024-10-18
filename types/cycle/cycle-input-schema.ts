import { z } from 'zod';

export const CycleInputSchema = z.object({
  start_date: z.date({ required_error: "Tanggal mulai harus diisi" }),
  end_date: z.date(),
  pond_fish_amount: z.array(z.object({
    pond_id: z.string(),
    fish_amount: z
      .number()
      .positive('Jumlah ikan harus lebih besar dari 0')
      .int('Jumlah ikan harus bilangan bulat')
  }))
})

export type CycleInput = z.infer<typeof CycleInputSchema>;