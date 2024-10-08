import { z } from 'zod';

export const CycleInputSchema = z.object({
  start_date: z.date(),
  end_date: z.date(),
  pond_fish: z.array(z.object({
    pond_id: z.string(),
    fish_amount: z.number().positive()
  }))
}).refine(data => {
  const startDate = new Date(data.start_date).getTime();
  const endDate = new Date(data.end_date).getTime();
  return endDate - startDate === 60 * 24 * 60 * 60 * 1000;
}, {
  message: 'Durasi siklus harus 60 hari',
  path: ['start_date']
}).refine(data => { 
  const startDate = new Date(data.start_date).getTime();
  const endDate = new Date(data.end_date).getTime();
  return endDate > startDate;
}, {
  message: 'Tanggal akhir harus setelah tanggal mulai',
  path: ['end_date']
})

export type CycleInput = z.infer<typeof CycleInputSchema>;