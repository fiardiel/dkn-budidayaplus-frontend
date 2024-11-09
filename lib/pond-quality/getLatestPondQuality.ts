'use server'

import { PondQuality } from "@/types/pond-quality";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_BASE_URL;

export async function getLatestPondQuality(pondId: string, cycleId: string): Promise<PondQuality | undefined> {
  const token = cookies().get("accessToken")?.value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/pond-quality/${cycleId}/${pondId}/latest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      return undefined
    }
    return res.json()
  } catch {
    throw new Error("Gagal terhubung ke server")
  }
}