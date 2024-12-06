import { render, screen, waitFor } from '@testing-library/react';
import AddCycle from '@/components/cycle/AddCycle';
import { fetchPonds } from '@/lib/pond';

jest.mock('@/lib/pond', () => ({
  fetchPonds: jest.fn()
}))

jest.mock('@/components/cycle', () => ({
  AddCycleModal: () => <div data-testid='addCycleModal'>AddCycleModal</div>
}))

const mockPonds = [
  {
    pond_id: '1',
    name: 'Pond 1',
    length: 10,
    width: 10,
    depth: 10,
    image_name: 'pond1.jpg',
  },
  {
    pond_id: '2',
    name: 'Pond 2',
    length: 10,
    width: 10,
    depth: 10,
    image_name: 'pond2.jpg',
  },
]

describe('Add Cycle', () => {
  it('renders the add cycle button', async () => {
    (fetchPonds as jest.Mock).mockResolvedValue(mockPonds);
    const ui = await AddCycle({})
    render(ui)
    // await waitFor(() => {
    //   expect(screen.getByTestId('addCycleModal')).toBeInTheDocument();
    // });
  })
})
