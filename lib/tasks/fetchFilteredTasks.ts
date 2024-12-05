'use server'

import { Task } from "@/types/tasks";
import { cookies } from "next/headers"

export const fetchFilteredTasks = async (): Promise<Task[]> => {
  const accessToken = cookies().get('accessToken')?.value
  const baseUrl = process.env.API_BASE_URL;
  const url = `${baseUrl}/api/tasks/filter`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const data = await response.json()
    return response.ok ? data : []
  } catch (error) {
    console.log(error)
    return []
  }
}
