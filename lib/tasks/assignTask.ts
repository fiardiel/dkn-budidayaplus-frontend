'use server'

import { Task } from "@/types/tasks"
import { cookies } from "next/headers"

export async function assignTask(taskId: string, assigneeUsername: string) {
  const url = `${process.env.API_BASE_URL}/api/tasks/${taskId}/assign`
  const accessToken = cookies().get('accessToken')?.value

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ assignee: assigneeUsername }),
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
      error: "Gagal menetapkan petugas"
    }
  }
}
