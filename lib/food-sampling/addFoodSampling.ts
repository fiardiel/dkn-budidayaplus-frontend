'use server'

import { cookies } from "next/headers";
import { formDataToObject } from "@/lib/utils";

export async function addFoodSampling(
  pondId: string, 
  cycleId: string, 
  data: FormData
): Promise<{ success: boolean; message?: string }> {
  const API_BASE_URL = process.env.API_BASE_URL;
  
  const token = cookies().get('accessToken')?.value;
  const apiUrl = `${API_BASE_URL}/api/food-sampling/${pondId}/${cycleId}/`;
  const samplingData = formDataToObject(data);
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(samplingData),
    });

    if (response.ok) {
      return { success: true, message: 'Data pengambilan sampel makanan berhasil ditambahkan' };
    } else {
      const errorResponse = await response.json();
      return { success: false, message: errorResponse?.message || 'Gagal menambahkan data pengambilan sampel makanan' };
    }
  } catch (error) {
    throw new Error("Gagal terhubung ke server");
  }
}