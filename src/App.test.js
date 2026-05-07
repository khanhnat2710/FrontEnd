import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { getDashboardData } from './services/dashboardApi';

jest.mock('./services/dashboardApi', () => ({
  getDashboardData: jest.fn(),
}));

const mockDashboardData = {
  summaryCards: [
    { title: 'Doanh thu hôm nay', value: '24.8 triệu', change: '+12%', tone: 'success' },
  ],
  featuredBooks: [
    { name: 'Nhà giả kim', author: 'Paulo Coelho', stock: 42, price: '89.000đ', status: 'Bán chạy' },
  ],
  orders: [
    { id: '#DH1024', customer: 'Nguyễn Minh Châu', channel: 'Website', total: '420.000đ', state: 'Đang đóng gói' },
  ],
  alerts: [
    { label: 'Sách giáo khoa lớp 12', detail: 'Còn 6 cuốn trong kho trung tâm' },
  ],
  staffTasks: [
    { label: 'Cập nhật giá khu kinh tế', progress: 82 },
  ],
  customers: [
    { name: 'Nguyễn Thu Hà', segment: 'VIP', spend: '4.200.000đ', visits: 18 },
  ],
  promotions: [
    { name: 'Flash sale cuối tuần', period: '26/04 - 28/04', effect: '+18% đơn online' },
  ],
  reportCards: [
    { title: 'Doanh thu tuần', value: '168 triệu', description: 'Tăng 14% so với tuần trước' },
  ],
};

beforeEach(() => {
  getDashboardData.mockResolvedValue(mockDashboardData);
});

test('renders bookstore admin heading', async () => {
  render(<App />);

  expect(screen.getByText(/Đang tải dữ liệu/i)).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /Trang quản lý nhà sách/i })).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /Danh mục sách cần theo dõi/i })).toBeInTheDocument();
});

test('navigates to another page from sidebar', async () => {
  render(<App />);

  const promotionButton = await screen.findByRole('button', { name: /Khuyến mãi/i });
  fireEvent.click(promotionButton);

  expect(await screen.findByText(/Theo dõi hiệu quả các chiến dịch ưu đãi/i)).toBeInTheDocument();
});
