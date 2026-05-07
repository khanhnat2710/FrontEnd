import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import {
  createProduct,
  createStaffMember,
  getDashboardData,
  getProducts,
  getStaffMembers,
} from './services/dashboardApi';

jest.mock('./services/dashboardApi', () => ({
  createProduct: jest.fn(),
  createStaffMember: jest.fn(),
  deleteProduct: jest.fn(),
  deleteStaffMember: jest.fn(),
  getDashboardData: jest.fn(),
  getProducts: jest.fn(),
  getStaffMembers: jest.fn(),
  updateProduct: jest.fn(),
  updateStaffMember: jest.fn(),
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

const mockProducts = [
  {
    id: 'SP001',
    name: 'Atomic Habits',
    author: 'James Clear',
    category: 'Kỹ năng sống',
    price: '165.000đ',
    stock: 32,
    status: 'Đang bán',
  },
];

const mockStaffMembers = [
  {
    id: 'NS001',
    fullName: 'Nguyễn Thu Hà',
    role: 'Quản lý cửa hàng',
    email: 'thuha@bookstore.vn',
    phone: '0901234567',
    shift: 'Ca sáng',
    status: 'Đang làm việc',
  },
];

beforeEach(() => {
  getDashboardData.mockResolvedValue(mockDashboardData);
  getProducts.mockResolvedValue(mockProducts);
  getStaffMembers.mockResolvedValue(mockStaffMembers);
  createProduct.mockImplementation(async (product) => ({ id: 'SP999', ...product }));
  createStaffMember.mockImplementation(async (staffMember) => ({ id: 'NS999', ...staffMember }));
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

test('creates a new product from product admin page', async () => {
  render(<App />);

  fireEvent.click(await screen.findByRole('button', { name: /Sản phẩm/i }));

  expect(await screen.findByText(/Sản phẩm trong hệ thống/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Tên sách/i), { target: { value: 'Lược sử loài người' } });
  fireEvent.change(screen.getByLabelText(/Tác giả/i), { target: { value: 'Yuval Noah Harari' } });
  fireEvent.change(screen.getByLabelText(/Danh mục/i), { target: { value: 'Lịch sử' } });
  fireEvent.change(screen.getByLabelText(/Giá bán/i), { target: { value: '199.000đ' } });
  fireEvent.change(screen.getByLabelText(/Tồn kho/i), { target: { value: '12' } });

  fireEvent.click(screen.getByRole('button', { name: /Tạo sản phẩm/i }));

  expect(await screen.findByText(/Đã thêm sản phẩm mới/i)).toBeInTheDocument();
  expect(await screen.findByText(/Lược sử loài người/i)).toBeInTheDocument();
  expect(createProduct).toHaveBeenCalledWith({
    name: 'Lược sử loài người',
    author: 'Yuval Noah Harari',
    category: 'Lịch sử',
    price: '199.000đ',
    stock: 12,
    status: 'Đang bán',
  });
});

test('creates a new staff member from staff admin page', async () => {
  render(<App />);

  fireEvent.click(await screen.findByRole('button', { name: /Nhân sự/i }));

  expect(await screen.findByText(/Nhân sự trong hệ thống/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Họ và tên/i), { target: { value: 'Phạm Hoàng Long' } });
  fireEvent.change(screen.getByLabelText(/Chức vụ/i), { target: { value: 'Bán hàng' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'long@bookstore.vn' } });
  fireEvent.change(screen.getByLabelText(/Số điện thoại/i), { target: { value: '0933555777' } });

  fireEvent.click(screen.getByRole('button', { name: /Tạo nhân sự/i }));

  expect(await screen.findByText(/Đã thêm nhân sự mới/i)).toBeInTheDocument();
  expect(await screen.findByText(/Phạm Hoàng Long/i)).toBeInTheDocument();
  expect(createStaffMember).toHaveBeenCalledWith({
    fullName: 'Phạm Hoàng Long',
    role: 'Bán hàng',
    email: 'long@bookstore.vn',
    phone: '0933555777',
    shift: 'Ca sáng',
    status: 'Đang làm việc',
  });
});
