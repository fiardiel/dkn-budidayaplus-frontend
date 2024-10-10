'use server'

import { cookies } from "next/headers";
import { formDataToObject, hashImageName } from "@/lib/utils";

export async function addFishSampling(
  data: FormData,
  pondId?: string,
  fishSamplingId?: string
): Promise<{ success: boolean; message?: string }> {
  const token = cookies().get('accessToken')?.value;

  const baseUrl = process.env.API_BASE_URL;
  const samplingPath = fishSamplingId ? fishSamplingId + '/' : '';
  const apiUrl = `${baseUrl}/api/fish-sampling/${pondId}/${samplingPath}`;

//   const image: File = data.get('image') as File
  const fishSamplingData = formDataToObject(data)

//   let hashedImageName = ''
//   if (image.name) {
//     hashedImageName = await hashImageName(image.name)
//   }

  const response = await fetch(apiUrl, {
    method: fishSamplingId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        ...fishSamplingData,
        // image_name: hashedImageName,
      }),
  });

  if (response.ok) {
    return { success: true, message: 'Fish sampling data submitted successfully' };
  } else {
    const errorResponse = await response.json();
    return { success: false, message: errorResponse?.message || 'Failed to submit fish sampling data' };
  }
}