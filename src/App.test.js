import { render, screen } from '@testing-library/react';
import App from './App';

test('renders bookstore customer interface', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', {
      name: /Tìm cuốn sách tiếp theo cho kệ sách của bạn/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Sách nổi bật/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Đặt sách/i })).toBeInTheDocument();
});
