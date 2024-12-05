'use server'

import { RegisterForm } from "@/types/auth/register";
import { Profile } from "@/types/profile";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createWorker(input: RegisterForm): Promise<{ data: Profile | undefined; error: string }> {
  const url = `${process.env.API_BASE_URL}/api/profile/create-worker`
  const accessToken = cookies().get('accessToken')?.value
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(input)
    })

    const data = await res.json()
    revalidatePath('/profile/[username]', 'page')

    return {
      data: res.ok ? data : undefined,
      error: data.detail || ''
    }
  } catch (error) {
    return {
      data: undefined,
      error: 'Terjadi kesalahan pada proses registrasi'
    }
  }
}
