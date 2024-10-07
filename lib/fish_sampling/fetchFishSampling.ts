'use server'

export async function fetchFishSampling(pondId: string, token: string) {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/fish-sampling/${pondId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return undefined;
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch fish samplings:", error);
    throw new Error("Gagal terhubung ke server");
  }
}