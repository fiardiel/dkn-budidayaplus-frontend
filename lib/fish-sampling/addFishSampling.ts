'use server'

import { cookies } from "next/headers";
import { formDataToObject } from "@/lib/utils";

export async function addFishSampling(
  data: FormData,
  pondId?: string,
  fishSamplingId?: string
): Promise<{ success: boolean; message?: string }> {
  const token = cookies().get('accessToken')?.value;

  const baseUrl = process.env.API_BASE_URL;
  const samplingPath = fishSamplingId ? fishSamplingId + '/' : '';
  const apiUrl = `${baseUrl}/api/fish-sampling/${pondId}/${samplingPath}`;

  const fishSamplingData = formDataToObject(data)

  const response = await fetch(apiUrl, {
    method: fishSamplingId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        ...fishSamplingData,
      }),
  });

  if (response.ok) {
    return { success: true, message: 'Fish sampling data submitted successfully' };
  } else {
    const errorResponse = await response.json();
    return { success: false, message: errorResponse?.message || 'Failed to submit fish sampling data' };
  }
}