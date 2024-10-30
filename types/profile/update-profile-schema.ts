import { z } from "zod";

export const UpdateProfileSchema = z.object({
  first_name: z.string().min(1, "Tolong masukkan nama depan anda").max(25, "Nama depan anda terlalu panjang"),
  last_name: z.string().min(1, "Tolong masukkan nama belakang anda").max(25, "Nama belakang anda terlalu panjang"),
})

export type UpdateProfileInput = z.infer<typeof UpdateProfileSchema>
