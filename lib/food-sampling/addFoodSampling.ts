'use server'

import { cookies } from "next/headers";
import { formDataToObject } from "@/lib/utils";

export async function addFoodSampling(
  data: FormData,
  pondId?: string,
  cycleId?: string,
  foodSamplingId?: string
): Promise<{ success: boolean; message?: string }> {
  const token = cookies().get('accessToken')?.value;

  const baseUrl = process.env.API_BASE_URL;
  const samplingPath = foodSamplingId ? foodSamplingId + '/' : '';
  const apiUrl = `${baseUrl}/api/food-sampling/${pondId}/${cycleId}/${samplingPath}`;
 
  const foodSamplingData = formDataToObject(data)

  const response = await fetch(apiUrl, {
    method: foodSamplingId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        ...foodSamplingData,
      }),
  });

  if (response.ok) {
    return { success: true, message: 'Food sampling data submitted successfully' };
  } else {
    const errorResponse = await response.json();
    return { success: false, message: errorResponse?.message || 'Failed to submit food sampling data' };
  }
}