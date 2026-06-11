import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bookstore customer interface', () => {
  render(<App />);
  expect(screen.getByText(/Tìm cuốn sách tiếp theo/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Sách nổi bật/i })).toBeInTheDocument();
});
