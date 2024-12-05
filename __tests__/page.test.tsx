import Home from "@/app/page"
import { render, screen } from "@testing-library/react"

jest.mock('@/components/cycle', () => ({
  Cycle: () => <div data-testid='cycleList' />
}))

test("Renders the BudidayaPlus Coming Soon on the Home Page", () => {
  render(<Home />)
  expect(screen.getByText((content, element) => {
    return element?.textContent === "BudidayaPlus"
  })).toBeInTheDocument()
  expect(screen.getByTestId('cycleList')).toBeInTheDocument()
  expect(screen.getByTestId('addCycleModal')).toBeInTheDocument()
})
