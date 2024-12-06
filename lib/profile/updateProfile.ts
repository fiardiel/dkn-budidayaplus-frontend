'use server'

import { UpdateProfileInput } from "@/types/profile";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateProfile(input: UpdateProfileInput) {
  const API_URL = `${process.env.API_BASE_URL}/api/profile/`;
  const accessToken = cookies().get("accessToken")?.value;
  try {
    const response = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    revalidatePath("/profile/[username]", 'page');
    return response.ok ? data : undefined;
  } catch (error) {
    return undefined;
  }
}
