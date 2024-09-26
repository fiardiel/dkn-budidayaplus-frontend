import User from "@/types/auth/user";

const API_URL = `http://127.0.0.1:8000`;

export async function getUser(token?: string): Promise<User | null> {
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
}