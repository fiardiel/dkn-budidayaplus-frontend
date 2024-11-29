import { render, screen, waitFor } from '@testing-library/react';
import PondDetailPage from '@/app/pond/[id]/page';
import { fetchPond } from '@/lib/pond';
import { getLatestCycle } from '@/lib/cycle';

jest.mock('@/components/pond', () => ({
  DeletePond: () => <div>DeletePond</div>,
  EditPond: () => <div>EditPond</div>,
}));

jest.mock('@/components/fish-sampling', () => ({
  FishSamplingCard: () => <div>FishSamplingCard</div>,
}))

jest.mock('@/components/food-sampling', () => ({
  FoodSampling: () => <div>FoodSampling</div>,
}))

jest.mock('@/components/pond-quality', () => ({
  PondQuality: () => <div>PondQuality</div>,
}))

jest.mock('@/lib/cycle', () => ({
  getLatestCycle: jest.fn(),
}))

jest.mock('@/lib/pond', () => ({
  fetchPond: jest.fn(),
}))

const mockPonds = {
  pond_id: '1',
  name: 'Pond 1',
  length: 10,
  width: 10,
  depth: 10,
  image_name: 'image.png',
}


describe('PondDetailPage', () => {
  it('should render PondDetailPage', async () => {
    (fetchPond as jest.Mock).mockResolvedValue(mockPonds);
    (getLatestCycle as jest.Mock).mockResolvedValue({ id: '1' });

    const ui = await PondDetailPage({ params: { id: '1' } });
    render(ui);

    await waitFor(() => {
      expect(screen.getByText('Selamat datang di')).toBeInTheDocument();
      expect(screen.getByText('Pond 1')).toBeInTheDocument();
      expect(screen.getByText('1000.00 m')).toBeInTheDocument();
      expect(screen.getByText('PondQuality')).toBeInTheDocument();
      expect(screen.getByText('FishSamplingCard')).toBeInTheDocument();
      expect(screen.getByText('FoodSampling')).toBeInTheDocument();
    });
  })

  it('should render error message if pond not found', async () => {
    (fetchPond as jest.Mock).mockResolvedValue(undefined);
    (getLatestCycle as jest.Mock).mockResolvedValue({ id: '1' });

    const ui = await PondDetailPage({ params: { id: '1' } });
    render(ui);

    await waitFor(() => {
      expect(screen.getByText('Kolam tidak ditemukan')).toBeInTheDocument();
    });
  })
})
