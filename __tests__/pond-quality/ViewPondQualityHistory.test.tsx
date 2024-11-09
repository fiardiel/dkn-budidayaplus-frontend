import { render, waitFor, screen } from "@testing-library/react";
import ViewPondQualityHistory from "@/components/pond-quality/ViewPondQualityHistory";

describe('View Pond Quality History Button', () => {
  it('renders the button link component', () => {
    const props = {
      pondId: 'pond-id',
    }

    render(<ViewPondQualityHistory {...props} />)

    waitFor(() => {
      expect(screen.getByText('Lihat Riwayat')).toBeInTheDocument()
    })
  })
})
