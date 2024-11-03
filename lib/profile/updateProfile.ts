import { UpdateProfileInput } from "@/types/profile";

export async function updateProfile(input: UpdateProfileInput) {
  const response = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.detail);
  }

  return data;
}