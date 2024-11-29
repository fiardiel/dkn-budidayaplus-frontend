'use server'

import { Worker } from "@/types/profile";
import { cookies } from "next/headers";

export async function getWorkers(): Promise<Worker[]|undefined> {
  try {
    const API_URL = process.env.API_BASE_URL;
    const token = cookies().get('accessToken')?.value
    const response = await fetch(`${API_URL}/api/profile/workers/list/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return undefined;
    }
    return response.json();
  } catch {
    return undefined
  }
}