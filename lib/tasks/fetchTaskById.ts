'use server'

import { Task } from "@/types/tasks"
import { cookies } from "next/headers"

export async function fetchTaskById(id: string): Promise<Task | undefined> {
  const url = `${process.env.API_BASE_URL}/api/tasks/${id}`
  const accessToken = cookies().get('accessToken')?.value

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    return response.ok ? response.json() : undefined
  } catch (err) {
    return undefined
  }
}
