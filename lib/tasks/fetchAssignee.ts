'use server'

import { Task } from "@/types/tasks"
import { cookies } from "next/headers"

export async function fetchAssignee(task: Task): Promise<Task | null> {
  const token = cookies().get('accessToken')?.value
  const API_BASE_URL = process.env.API_BASE_URL

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/assign/${task.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    const data = await response.json()
    return response.ok ? data : null
  } catch (error) {
    console.log(error)
    return null
  }
}