import { fireEvent, render, screen } from '@testing-library/react';
import { HomePage } from '../pages/HomePage';

test('renders h1 title', () => {
  render(<HomePage />);
  const h1Element = screen.getByText(/Calculo do valor da ligação/i);
  expect(h1Element).toBeInTheDocument();
});

it("should show validation on blur", async () => {
  render(<HomePage />);
  const input = screen.getByLabelText("Codigo cidade de origem");
  fireEvent.blur(input);
  expect(screen.getByTestId("error")).not.toBe(null);
  expect(screen.getByTestId("error")).toHaveTextContent("Required");
});
