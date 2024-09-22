import User from "@/types/auth/user";
import Cookies from 'js-cookie'
import { cookies } from "next/headers";

const API_URL = `${process.env.API_BASE_URL}/api/auth/me`;

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