'use server'

import { TaskSorted } from "@/types/tasks"
import { cookies } from "next/headers"

export async function fetchTasksSorted(): Promise<TaskSorted> {
  const accessToken = cookies().get("accessToken")?.value
  const API_URL = process.env.API_BASE_URL + "/api/tasks/sorted"
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const data = await response.json()
    return response.ok ? data : { upcoming: [], past: [] }
  } catch (error) {
    console.log(error)
    return { upcoming: [], past: [] }
  }
}
