'use server'

import { cookies } from "next/headers"

export async function unassignTask(taskId: string) {
  const url = `${process.env.API_BASE_URL}/api/tasks/${taskId}/unassign`
  const accessToken = cookies().get('accessToken')?.value
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.detail)
    }
    return data
  } catch (error) {
    throw new Error('Terjadi kesalahan')
  }
}
