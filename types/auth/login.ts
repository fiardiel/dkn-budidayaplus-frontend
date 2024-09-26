import { z } from "zod";

export const loginSchema = z.object({
  phone_number: z
    .string()
    .min(10, "Nomor ponsel terlalu pendek")
    .max(13, "Nomor ponsel terlalu panjang")
    .refine((value) => /^\d+$/.test(value), {
      message: "Nomor ponsel hanya boleh berisi angka",
    })
    .refine((value) => value.startsWith("08"), {
      message: "Nomor ponsel harus dimulai dengan 08",
    }),
  password: z
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .max(50, "Kata sandi terlalu panjang")
    .refine((value) => /\d/.test(value), {
      message: "Kata sandi harus mengandung angka",
    }),
});

export type LoginForm = z.infer<typeof loginSchema>;
