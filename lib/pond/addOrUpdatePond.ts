'use server'

import { cookies } from "next/headers";
import { formDataToObject, hashImageName } from "@/lib/utils";

export async function addOrUpdatePond(data: FormData, pondId?: string): Promise<{ success: boolean; message?: string }>  {
  const token = cookies().get('accessToken')?.value
  
  const baseUrl = process.env.API_BASE_URL
  const pondPath = pondId ? `${pondId}/` : '' 
  const apiUrl = `${baseUrl}/api/pond/${pondPath}`

  const image: File = data.get('image') as File
  const pondData = formDataToObject(data)

  let hashedImageName = ''
  if (image.name) {
    hashedImageName = await hashImageName(image.name)
  }

  const response = await fetch(apiUrl, {
    method: pondId? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...pondData,
      image_name: hashedImageName,
    }),
  });

  return { success: response.ok };
}
