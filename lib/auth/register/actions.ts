"use server"

import { RegisterForm } from "@/types/auth/register"
import { cookies } from "next/headers"

export async function handleFormSubmit(data: RegisterForm): Promise<{ ok: boolean, message: string }> {
  const res = await fetch(`${process.env.API_BASE_URL}/api/auth/register`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  const jsonRes = await res.json()
  if (res.ok) {
    await setRefreshAndAccessTokens(jsonRes)
    return { ok: true, message: "Registrasi berhasil" }
  }
  return { ok: false, message: jsonRes.detail }
}

async function setRefreshAndAccessTokens(response: any) {
  const { refresh, access } = await response.json()
  cookies().set("refreshToken", refresh, { path: "/", httpOnly: true })
  cookies().set("accessToken", access, { path: "/", httpOnly: true })
}