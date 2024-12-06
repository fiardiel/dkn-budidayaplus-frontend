'use server'

import { Task } from "@/types/tasks"
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

    return {
      success: response.ok,
      data: data as Task,
      error: data.detail as string
    }
  } catch (error) {
    return {
      success: false,
      data: undefined,
      error: "Gagal menghapus petugas"
    }
  }
}
