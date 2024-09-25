"use server"

import { RegisterForm } from "@/types/auth/register"
import { cookies } from "next/headers"

export async function handleFormSubmit(data: RegisterForm): Promise<{ ok: boolean, message: string }> {
  const reqUrl = `${process.env.API_BASE_URL}/api/auth/register`
  try {
    const res = await registerRequest(reqUrl, data)
    
    if (res.ok) {
      await setRefreshAndAccessTokens(res)
      return { ok: true, message: "Registrasi berhasil" }
    }
  
    const errorResponse = await res.json()
    return { ok: false, message: errorResponse.detail }
  } catch (error) {
    return { ok: false, message: "Terjadi kesalahan pada registrasi"  }
  }
}

async function registerRequest(url: string, data: RegisterForm): Promise<Response> {
  return fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  });
}

async function setRefreshAndAccessTokens(response: Response) {
  const { refresh, access } = await response.json()
  cookies().set("refreshToken", refresh, { path: "/", httpOnly: true })
  cookies().set("accessToken", access, { path: "/", httpOnly: true })
}