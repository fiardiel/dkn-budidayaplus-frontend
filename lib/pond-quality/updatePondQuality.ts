'use server'

import { cookies } from "next/headers";
import { formDataToObject, hashImageName } from "@/lib/utils";

export async function addOrUpdatePondQuality(
  data: FormData,
  pondId?: string,
  cycleId?: string,
  pondQualityId?: string
): Promise<{ success: boolean; message?: string }> {
  const token = cookies().get('accessToken')?.value;

  const baseUrl = process.env.API_BASE_URL;
  const qualityPath = pondQualityId ? pondQualityId + '/' : '';
  const apiUrl = `${baseUrl}/api/pond-quality/${cycleId}/${pondId}/${qualityPath}`;

  const image: File = data.get('image') as File;
  const pondQualityData = formDataToObject(data);

  let hashedImageName = '';
  if (image.name) {
    hashedImageName = await hashImageName(image.name);
  }

  const response = await fetch(apiUrl, {
    method: pondQualityId ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        ...pondQualityData,
        image_name: hashedImageName,
      }),
  });

  if (response.ok) {
    return { success: true, message: 'Pond quality data submitted successfully' };
  } else {
    const errorResponse = await response.json();
    return { success: false, message: errorResponse?.message || 'Failed to submit pond quality data' };
  }
}