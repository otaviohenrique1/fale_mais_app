import { render, screen } from '@testing-library/react';
import { HomePage } from '../pages/HomePage';

test('renders h1 title', () => {
  render(<HomePage />);
  const h1Element = screen.getByText(/Calculo do valor da ligação/i);
  expect(h1Element).toBeInTheDocument();
});
