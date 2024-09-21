import NotFound from "@/app/not-found"
import { render, screen } from "@testing-library/react"

test("renders the not found page", () => {
  render(<NotFound />)
  expect(screen.getByText((_, element) => { 
    return element?.textContent === "404"
  })).toBeInTheDocument()
})