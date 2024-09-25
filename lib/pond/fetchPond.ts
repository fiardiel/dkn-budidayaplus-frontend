import { Pond } from "@/types/pond"

export async function fetchPond(pondId: string, token?: string): Promise<Pond | undefined> {
  const accessToken = token || ""
  console.log(accessToken)
  
  await new Promise((resolve) => setTimeout(resolve, 1000)) 
  const ponds: Pond[] = [
    { id: 'abcde', name: "Pond 1", volume: 121.0, image_name: "pond1.jpg" },
    { id: 'abcdefg', name: "Pond 2", volume: 144.0, image_name: "pond2.jpg" },
    { id: 'xyz', name: "Pond 3", volume: 169.0, image_name: "pond3.jpg" },
  ];
  return ponds.find(pond => pond.id === pondId)
}
