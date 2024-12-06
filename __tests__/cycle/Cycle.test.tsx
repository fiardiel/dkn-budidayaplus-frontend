import { render, screen } from '@testing-library/react';
import Cycle from '@/components/cycle/Cycle';
import { getProfile } from '@/lib/profile';

jest.mock('@/components/cycle', () => ({
  AddCycle: () => <div data-testid='addCycle'>AddCycle</div>,
  CycleList: () => <div data-testid='cycleList'>CycleList</div>
}))

jest.mock('@/lib/profile', () => ({
  getProfile: jest.fn().mockResolvedValue({
    id: 1,
    role: 'supervisor',
    image_name: 'image.jpg',
    user: {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '1234567890',
    }
  })
}))

describe('Cycle', () => {
  it('renders the cycle list', async () => {
    const ui = await Cycle()
    render(ui)
    expect(screen.getByTestId('addCycle')).toBeInTheDocument()
    expect(screen.getByTestId('cycleList')).toBeInTheDocument()
  })
})
