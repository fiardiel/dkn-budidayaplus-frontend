import { z } from "zod"

export const registerSchema = z.object({
  phone_number: z.string()
    .min(10, "Nomor ponsel anda terlalu pendek")
    .max(13, "Nomor ponsel anda terlalu panjang")
    .refine(value => /^\d+$/.test(value), {
      message: "Nomor ponsel hanya boleh berisi angka",
    })
    .refine(value => value.startsWith("08"), {
      message: "Nomor ponsel anda tidak valid",
    }),
  first_name: z.string().min(1, "Tolong masukkan nama depan anda").max(25, "Nama depan anda terlalu panjang"),
  last_name: z.string().min(1, "Tolong masukkan nama belakang anda").max(25, "Nama belakang anda terlalu panjang"),
  password: z.string()
    .min(8, "Kata sandi minimal 8 karakter")
    .max(50, "Kata sandi anda terlalu panjang")
    .refine(value => /\d/.test(value), {
      message: "Kata sandi harus mengandung angka",
    }),
})

export type RegisterForm = z.infer<typeof registerSchema>