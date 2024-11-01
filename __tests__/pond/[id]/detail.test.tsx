import { render, screen, waitFor } from '@testing-library/react';
import PondDetailPage from '@/app/pond/[id]/page';
import { fetchPond } from '@/lib/pond';
import { Pond } from '@/types/pond';
import { PondQuality } from '@/types/pond-quality';
import { getLatestPondQuality } from '@/lib/pond-quality';
import { FishSampling } from '@/types/fish-sampling';
import { fetchFishSampling } from '@/lib/fish-sampling';
import { getFoodSampling } from '@/lib/food-sampling'; 
import { FoodSampling } from '@/types/food-sampling'; 
import { Cycle } from '@/types/cycle';
import { getLatestCycle } from '@/lib/cycle/getLatestCycle';

jest.mock("@/lib/pond", () => ({
  fetchPond: jest.fn(),
}));

jest.mock("@/lib/cycle/getLatestCycle", () => ({
  getLatestCycle: jest.fn(),
}));

jest.mock('@/lib/pond-quality', () => ({
  getLatestPondQuality: jest.fn(),
}));

jest.mock('@/lib/fish-sampling', () => ({
  fetchFishSampling: jest.fn(),
}));

jest.mock('@/lib/food-sampling', () => ({
  getFoodSampling: jest.fn(),  
}));

const mockPonds: Pond[] = [
  { pond_id: 'abcde', name: "Pond 1", length: 121.0, width: 121.0, depth: 121.0, image_name: "pond1.jpg" },
  { pond_id: 'abcdefg', name: "Pond 2", length: 144.0, width: 144.0, depth: 144.0, image_name: "pond2.jpg" },
  { pond_id: 'xyz', name: "Pond 3", length: 169.0, width: 169.0, depth: 169.0, image_name: "pond3.jpg" },
];

const mockPondQuality: PondQuality = {
  id: 'abcde',
  pond: 'abcde',
  reporter: '081234567890',
  cycle: 'cycle123',
  recorded_at: new Date(),
  image_name: 'pond1.jpg',
  ph_level: 7.5,
  salinity: 35,
  water_temperature: 25,
  water_clarity: 8,
  water_circulation: 7.12,
  dissolved_oxygen: 5,
  orp: 200,
  ammonia: 0.112,
  nitrate: 0.134,
  phosphate: 0.144,
};

const mockFishSampling: FishSampling = {
  sampling_id: 'abc123',
  pond_id: 'abcde',
  fish_weight: 20,
  fish_length: 30,
  sample_date: '2024-10-03',
};

const mockCycle: Cycle = {
  id: '12345',
  start_date: new Date("2024-10-21"),
  end_date: new Date("2024-12-20"),
  supervisor: 'test',
  pond_fish_amount: [],
}

const mockFoodSampling: FoodSampling = {
  sampling_id: 'sample1',
  pond_id: 'abcde',
  cycle_id: 'cycle123',
  food_quantity: 100,
  sample_date: new Date('2024-10-01'),
};

describe('Pond detail page', () => {
  beforeEach(async () => {
    (fetchPond as jest.Mock).mockResolvedValue(mockPonds.find(pond => pond.pond_id === 'abcde'));
  })
  it('renders the pond detail page', async () => {
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText("Selamat datang di")).toBeInTheDocument();
      expect(screen.getByText("Pond 1")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /edit kolam/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /hapus kolam/i })).toBeInTheDocument();
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

  it('renders the pond quality list if pond quality exists', async () => {
    (getLatestPondQuality as jest.Mock).mockResolvedValue(mockPondQuality);
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Kualitas Air')).toBeInTheDocument();
      expect(screen.getByText('Suhu (°C)')).toBeInTheDocument();
      expect(screen.getByText('pH level')).toBeInTheDocument();
      expect(screen.getByText('Salinitas')).toBeInTheDocument();
      expect(screen.getByText('Kecerahan (cm)')).toBeInTheDocument();
      expect(screen.getByText('Sirkulasi')).toBeInTheDocument();
      expect(screen.getByText('DO (mg/L)')).toBeInTheDocument();
      expect(screen.getByText('ORP')).toBeInTheDocument();
      expect(screen.getByText('NH')).toBeInTheDocument();
      expect(screen.getByText('NO')).toBeInTheDocument();
      expect(screen.getByText('PO')).toBeInTheDocument();
    });
  })

  it('renders no pond quality message if pond quality does not exist', async () => {
    (getLatestPondQuality as jest.Mock).mockResolvedValue(undefined);
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Tidak ada data kualitas air')).toBeInTheDocument();
    });
  })

  it('handles the error case of fetching pond quality', async () => {
    (getLatestPondQuality as jest.Mock).mockRejectedValue(new Error("Gagal terhubung ke server"));
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Tidak ada data kualitas air')).toBeInTheDocument();
    });
  })
  
  it('renders the fish sampling list if fish sampling exists', async () => {
    (fetchFishSampling as jest.Mock).mockResolvedValue([mockFishSampling]);
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Berat Ikan (kg)')).toBeInTheDocument();
      expect(screen.getByText('Panjang Ikan (cm)')).toBeInTheDocument();
      expect(screen.getByText('Tanggal Sampling')).toBeInTheDocument();
    });
  })

  it('renders no fish sampling message if fish sampling does not exist', async () => {
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

  it('handles when food sampling cannot exist due to non-existent cycle', async () => {
    (getLatestCycle as jest.Mock).mockRejectedValue(new Error("Gagal terhubung ke server"));
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Tidak dapat menambahkan sample makanan karena siklus belum ada')).toBeInTheDocument();
    });
  })

  it('handles when food sampling can exist due to existant cycle', async () => {
    (getLatestCycle as jest.Mock).mockResolvedValue(mockCycle);
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Add Food Sampling')).toBeInTheDocument();
    });
  })

  it('renders no fish sampling message if fish sampling does not exist', async () => {
    (fetchFishSampling as jest.Mock).mockResolvedValue([]);
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Tidak ada sampling ikan')).toBeInTheDocument();
    });
  });

  it('renders the food sampling list if food sampling exists', async () => {
    (getFoodSampling as jest.Mock).mockResolvedValue([mockFoodSampling]);
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Kuantitas Makanan (gram): 100')).toBeInTheDocument();
    });
  });

  it('renders no food sampling message if food sampling does not exist', async () => {
    (getFoodSampling as jest.Mock).mockResolvedValue([]);
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Tidak ada data sampling makanan')).toBeInTheDocument();
    });
  });

  it('handles the error case of fetching food sampling', async () => {
    (getFoodSampling as jest.Mock).mockRejectedValue(new Error("Gagal terhubung ke server"));
    render(await PondDetailPage({params: {id: 'abcde'}}));
    await waitFor(() => {
      expect(screen.getByText('Tidak ada data sampling makanan')).toBeInTheDocument();
    });
  });
})
