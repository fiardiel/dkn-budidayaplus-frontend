import PondPage from "@/app/pond/page";
import { render, screen } from "@testing-library/react";
import { fetchPonds } from "@/lib/pond";
import { Pond } from "@/types/pond";

jest.mock("@/lib/pond/utils", () => ({
  fetchPonds: jest.fn(),
}));

const mockPonds: Pond[] = [
  { id: 'abcde', name: "Pond 1", volume: 121.0, image_name: "pond1.jpg" },
  { id: 'abcdefg', name: "Pond 2", volume: 144.0, image_name: "pond2.jpg" },
  { id: 'xyz', name: "Pond 3", volume: 169.0, image_name: "pond3.jpg" },
];

describe("Pond page", () => {
  beforeEach(() => {
    (fetchPonds as jest.Mock).mockResolvedValue(mockPonds);
  });

  it("renders a list of pond cards", async () => {
    render(<PondPage />);
    
    const pondCard1 = await screen.findByText("Pond 1");
    const pondCard2 = await screen.findByText("Pond 2");
    const pondCard3 = await screen.findByText("Pond 3");

    expect(pondCard1).toBeInTheDocument();
    expect(pondCard2).toBeInTheDocument();
    expect(pondCard3).toBeInTheDocument();
  });

  it("renders the pond card with the correct volume", async () => {
    render(<PondPage />);
    
    const pondCard1 = await screen.findByText("Pond 1");
    const pondCard2 = await screen.findByText("Pond 2");
    const pondCard3 = await screen.findByText("Pond 3");

    expect(pondCard1).toHaveTextContent("121.0");
    expect(pondCard2).toHaveTextContent("144.0");
    expect(pondCard3).toHaveTextContent("169.0");
  });

  it("renders the pond card with the correct image", async () => {
    render(<PondPage />);

    const pondCard1 = await screen.findByAltText("Pond 1 image");
    const pondCard2 = await screen.findByAltText("Pond 2 image");
    const pondCard3 = await screen.findByAltText("Pond 3 image");

    expect(pondCard1).toHaveAttribute("src", "pond1.jpg");
    expect(pondCard2).toHaveAttribute("src", "pond2.jpg");
    expect(pondCard3).toHaveAttribute("src", "pond3.jpg");
  });

  it("renders a button to the pond detail page with the correct link", async () => {
    render(<PondPage />);

    const pondCard1 = await screen.findByText("Pond 1");
    const pondCard2 = await screen.findByText("Pond 2");
    const pondCard3 = await screen.findByText("Pond 3");

    expect(pondCard1.closest("a")).toHaveAttribute("href", "/pond/abcde");
    expect(pondCard2.closest("a")).toHaveAttribute("href", "/pond/abcdefg");
    expect(pondCard3.closest("a")).toHaveAttribute("href", "/pond/xyz");
  });

  it("handles an error when fetching ponds", async () => {
    (fetchPonds as jest.Mock).mockRejectedValue(new Error("Failed to fetch ponds"));
    
    render(<PondPage />);
    
    const error = await screen.findByText("Failed to fetch ponds");
    expect(error).toBeInTheDocument();
  });
});
