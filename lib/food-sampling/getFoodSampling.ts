'use server'

import { cookies } from 'next/headers';
import { FoodSampling } from '@/types/food-sampling';

const API_BASE_URL = process.env.API_BASE_URL;

export async function getFoodSampling(pondId: string, cycleId: string, foodSamplingId: string): Promise<FoodSampling[]> {
  const token = cookies().get('accessToken')?.value;
  try {
    const response = await fetch(`${API_BASE_URL}/api/food-sampling/${cycleId}/${pondId}/${foodSamplingId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch food sampling data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching food sampling data:', error);
    throw new Error('Failed to fetch food sampling data');
  }
}
