"use server";

import { cookies } from "next/headers";

export async function updateTaskStatus(
  taskId: string,
  newStatus: string
): Promise<{ success: boolean; message?: string }> {
  const token = cookies().get("accessToken")?.value;
  const API_BASE_URL = process.env.API_BASE_URL;

  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}/status/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const result = await response.json();

    return response.ok
      ? { success: true, message: "Task status updated successfully" }
      : { success: false, message: result.message || "Failed to update task status" };
  } catch (error) {
    console.error("Error updating task status:", error);
    return { success: false, message: "An error occurred while updating the task status" };
  }
}
