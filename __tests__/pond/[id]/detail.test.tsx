import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PondDetailPage from '@/app/pond/[id]/page';
import { fetchPond } from '@/lib/pond';
import { cookies } from 'next/headers';
import { Pond } from '@/types/pond';
import { FishSampling } from '@/types/fish_sampling';
import { fetchFishSampling } from '@/lib/fish_sampling';

jest.mock("@/lib/pond", () => ({
  fetchPond: jest.fn(),
  fetchFishSampling: jest.fn(),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({ value: "accessToken" }),
  }),
}));

jest.mock('@/lib/fish_sampling', () => ({
  fetchFishSampling: jest.fn(),
}));

const mockPonds: Pond[] = [
  { pond_id: 'abcde', name: "Pond 1", length: 121.0, width: 121.0, depth: 121.0, image_name: "pond1.jpg" },
  { pond_id: 'abcdefg', name: "Pond 2", length: 144.0, width: 144.0, depth: 144.0, image_name: "pond2.jpg" },
  { pond_id: 'xyz', name: "Pond 3", length: 169.0, width: 169.0, depth: 169.0, image_name: "pond3.jpg" },
];

const mockFishSampling: FishSampling[] = [
  {
    sampling_id: '123', 
    pond_id: 'abcde',
    fish_weight: 2.5, 
    fish_length: 12.3, 
    sample_date: '2024-09-28',
    // reporter: 'userA'
  },
];

describe('PondListPage', () => {
  beforeEach(async () => {
    (fetchPond as jest.Mock).mockResolvedValue(mockPonds.find(pond => pond.pond_id === 'abcde'));
    (cookies as jest.Mock).mockReturnValue({ get: jest.fn().mockReturnValue({ value: "accessToken" }) });
  })
  it('renders the pond list page', async () => {
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText("Selamat datang di")).toBeInTheDocument();
      expect(screen.getByText("Pond 1")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /edit kolam/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /hapus kolam/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Tambah Sampling Ikan/i })).toBeInTheDocument();
    });
  });

  it('renders no pond message', async () => {
    (fetchPond as jest.Mock).mockResolvedValue(undefined);
    render(await PondDetailPage({ params: { id: 'abcde' } }));
    
    await waitFor(() => {
      expect(screen.getByText("Kolam tidak ditemukan")).toBeInTheDocument();
    });
  });

  it('handles the error case of fetching ponds', async () => {
    (fetchPond as jest.Mock).mockRejectedValue(new Error("Failed to fetch ponds"));
    render(await PondDetailPage({ params: { id: 'abcde' } }));
    
    await waitFor(() => {
      expect(screen.getByText("Kolam tidak ditemukan")).toBeInTheDocument();
    });
  });

  it('renders the pond image', async () => {
    (fetchPond as jest.Mock).mockResolvedValue(mockPonds.find(pond => pond.pond_id === 'abcde'));
    render(await PondDetailPage({params: {id: 'abcde'}}));
    const pondImage = await screen.findByAltText("Pond 1 image");
    await waitFor(() => {
      expect(pondImage).toHaveAttribute("src", "/_next/image?url=%2Ffallbackimage.png&w=1080&q=75");
    })
  })

  it('renders the fish sampling list if fish sampling exists', async () => {
    (fetchFishSampling as jest.Mock).mockResolvedValue(mockFishSampling);
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Berat Ikan (kg)')).toBeInTheDocument();
      expect(screen.getByText('Panjang Ikan (cm)')).toBeInTheDocument();
      // expect(screen.getByText('reporter')).toBeInTheDocument();
      expect(screen.getByText('Tanggal Sampling')).toBeInTheDocument();
    });
  })

  it('renders no fish sampling message if fish samplingdoes not exist', async () => {
    (fetchFishSampling as jest.Mock).mockResolvedValue(undefined);
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Tidak ada sampling ikan')).toBeInTheDocument();
    });
  })

  it('handles the error case of fetching fish sampling', async () => {
    (fetchFishSampling as jest.Mock).mockRejectedValue(new Error("Gagal terhubung ke server"));
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Tidak ada sampling ikan')).toBeInTheDocument();
    });
  })
})
