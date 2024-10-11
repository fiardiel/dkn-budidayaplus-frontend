import { z } from 'zod';

export const PondQualitySchema = z.object({
  ph_level: z
    .number()
    .min(0, 'Nilai pH minimal 0')
    .max(14, 'Nilai pH maksimal 14'),
  salinity: z
    .number()
    .positive('Salinitas harus berupa angka positif'),
  water_temperature: z
    .number()
    .positive('Temperatur air harus berupa angka positif'),
  water_clarity: z
    .number()
    .positive('Kejernihan air harus berupa angka positif'),
  water_circulation: z
    .number()
    .positive('Sirkulasi air harus berupa angka positif'),
  dissolved_oxygen: z
    .number()
    .positive('Oksigen terlarut harus berupa angka positif'),
  orp: z
    .number()
    .positive('ORP harus berupa angka positif'),
  ammonia: z
    .number()
    .positive('Amonia harus berupa angka positif'),
  nitrate: z
    .number()
    .positive('Nitrat harus berupa angka positif'),
  phosphate: z
    .number()
    .positive('Fosfat harus berupa angka positif'),
  image: z.any().optional(),
});

export type PondQualityInput = z.infer<typeof PondQualitySchema>;
