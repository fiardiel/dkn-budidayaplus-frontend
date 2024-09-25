export async function fetchPonds() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { id: 'abcde', name: "Pond 1", volume: 121.0, image_name: "pond1.jpg" },
    { id: 'abcdefg', name: "Pond 2", volume: 144.0, image_name: "pond2.jpg" },
    { id: 'xyz', name: "Pond 3", volume: 169.0, image_name: "pond3.jpg" },
  ];
}