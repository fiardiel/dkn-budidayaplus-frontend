"use server"

import User from "@/types/auth/user";
import { cookies } from "next/headers";

export async function getUser(): Promise<User | null> {
  try {
    const API_URL = process.env.API_BASE_URL;
    const token = cookies().get('accessToken')?.value
    const response = await fetch(`${API_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch {
    return null
  }
  
}