import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the home page hero and main navigation', () => {
  render(<App />);
  expect(screen.getAllByText(/engineered to/i).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('navigation').length).toBeGreaterThan(0);
});
