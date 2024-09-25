import User from "@/types/auth/user";

const API_URL = `http://localhost:8000/api/auth/me`;

export async function getUser(token?: string): Promise<User | null> {
  const response = await fetch(API_URL, {
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
}