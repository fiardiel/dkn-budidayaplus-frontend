'use server'

import { Cycle } from "@/types/cycle";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL;

export async function getLatestCycle(): Promise<Cycle | undefined> {
  const token = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/cycle/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return res.ok ? await res.json() : undefined;
  } catch {
    return undefined
  }
}
