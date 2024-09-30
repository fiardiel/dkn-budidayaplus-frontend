import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PondListPage from '@/app/pond/page';
import { fetchPonds } from '@/lib/pond';
import { getUser } from '@/lib/auth';
import { cookies } from 'next/headers';
import { Pond } from '@/types/pond';
import User from '@/types/auth/user';

jest.mock("@/lib/pond", () => ({
  fetchPonds: jest.fn(),
}));

jest.mock("@/lib/auth", () => ({
  getUser: jest.fn().mockResolvedValue({ id: 1, phone_number: "0812345678", first_name: "John", last_name: "Doe" } as User),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({ value: "accessToken" }),
  }),
}));

const mockPonds: Pond[] = [
  { pond_id: 'abcde', name: "Pond 1", length: 121.0, width: 121.0, depth: 121.0, image_name: "pond1.jpg" },
  { pond_id: 'abcdefg', name: "Pond 2", length: 144.0, width: 144.0, depth: 144.0, image_name: "pond2.jpg" },
  { pond_id: 'xyz', name: "Pond 3", length: 169.0, width: 169.0, depth: 169.0, image_name: "pond3.jpg" },
];

describe('PondListPage', () => {
  beforeEach(() => {
    (fetchPonds as jest.Mock).mockResolvedValue(mockPonds);
    (getUser as jest.Mock).mockResolvedValue({ id: 1, phone_number: "0812345678", first_name: "John", last_name: "Doe" } as User);
    (cookies as jest.Mock).mockReturnValue({ get: jest.fn().mockReturnValue({ value: "accessToken" }) });
  });

  it('renders the pond list page', async () => {
    render(await PondListPage());

    await waitFor(() => {
      expect(screen.getByText("Selamat datang")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Pond 1")).toBeInTheDocument();
      expect(screen.getByText("Pond 2")).toBeInTheDocument();
      expect(screen.getByText("Pond 3")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /tambah kolam/i })).toBeInTheDocument();
    });
  });

  it('renders no pond message', async () => {
    (fetchPonds as jest.Mock).mockResolvedValue([]);
    render(await PondListPage());

    await waitFor(() => {
      expect(screen.getByText("Tidak ada kolam")).toBeInTheDocument();
    });
  });

  it("doesn't render the user name if user is not found", async () => {
    (getUser as jest.Mock).mockResolvedValue(null);
    render(await PondListPage());

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
    });
  });

  it('handles the error case of fetching ponds', async () => {
    (fetchPonds as jest.Mock).mockRejectedValue(new Error("Failed to fetch ponds"));
    render(await PondListPage());

    await waitFor(() => {
      expect(screen.getByText("Tidak ada kolam")).toBeInTheDocument();
    });
  });

  it('renders the pond image and handles fallback', async () => {
    render(await PondListPage());

    const pondImage = await screen.findByAltText("Pond 1 image");
    expect(pondImage).toHaveAttribute("src", "http://localhost/_next/image?url=%2Ffallbackimage.png&w=1080&q=75");

    fireEvent.error(pondImage);

    await waitFor(() => {
      expect(pondImage).toHaveAttribute("src", "http://localhost/_next/image?url=%2Ffallbackimage.png&w=1080&q=75");
    })
  })

  it('opens and closes the Add Pond modal', async () => {
    render(await PondListPage());

    fireEvent.click(screen.getByRole('button', { name: /Tambah Kolam/i }));
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Nama Kolam')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Nama Kolam')).not.toBeInTheDocument();
    });
  });

  it('opens and closes the Fish Sampling Modal', async () => {
    render(await PondListPage());

    fireEvent.click(screen.getByRole('button', { name: /Tambah Sampling Ikan/i }));
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Nama Kolam')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    await waitFor(() => {
      expect(screen.queryByPlaceholderText('Nama Kolam')).not.toBeInTheDocument();
    });
  });
})
