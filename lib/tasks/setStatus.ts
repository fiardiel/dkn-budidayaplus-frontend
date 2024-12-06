'use server'

import { cookies } from "next/headers"

export async function setStatus(taskId: string, status: string) {
  const url = `${process.env.API_BASE_URL}/api/tasks/${taskId}/status/`
  const accessToken = cookies().get('accessToken')?.value
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status: status }),
    })
    const data = await response.json()
    return {
      success: response.ok,
      data: data,
      error: data.detail,
    }
  } catch (error) {
    return {
      success: false,
      data: undefined,
      error: 'Gagal mengubah status task',
    }
  }
}
