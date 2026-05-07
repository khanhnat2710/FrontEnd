import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import {
  createCustomer,
  createOrder,
  createProduct,
  createPromotion,
  createStaffMember,
  getCustomers,
  getDashboardData,
  getOrders,
  getProducts,
  getPromotions,
  getStaffMembers,
} from './services/dashboardApi';

jest.mock('./services/dashboardApi', () => ({
  createCustomer: jest.fn(),
  createOrder: jest.fn(),
  createProduct: jest.fn(),
  createPromotion: jest.fn(),
  createStaffMember: jest.fn(),
  deleteCustomer: jest.fn(),
  deleteOrder: jest.fn(),
  deleteProduct: jest.fn(),
  deletePromotion: jest.fn(),
  deleteStaffMember: jest.fn(),
  getCustomers: jest.fn(),
  getDashboardData: jest.fn(),
  getOrders: jest.fn(),
  getProducts: jest.fn(),
  getPromotions: jest.fn(),
  getStaffMembers: jest.fn(),
  updateCustomer: jest.fn(),
  updateOrder: jest.fn(),
  updateProduct: jest.fn(),
  updatePromotion: jest.fn(),
  updateStaffMember: jest.fn(),
}));

const mockDashboardData = {
  summaryCards: [
    { title: 'Doanh thu đơn hàng', value: '1.670.000đ', change: '4 đơn', tone: 'success' },
  ],
  featuredBooks: [
    { id: 'SP001', name: 'Nhà giả kim', author: 'Paulo Coelho', stock: 42, price: '89.000đ', status: 'Đang bán' },
  ],
  orders: [
    { id: '#DH1024', customer: 'Nguyễn Minh Châu', channel: 'Website', total: '420.000đ', state: 'Đang đóng gói' },
  ],
  alerts: [
    { label: 'Nhà giả kim', detail: 'Chỉ còn 12 cuốn trong kho, cần bổ sung sớm.' },
  ],
  staffTasks: [
    { label: 'Quản trị viên - Nguyễn Thu Hà', progress: 82 },
  ],
  customers: [
    { id: 'KH001', name: 'Nguyễn Thu Hà', segment: 'VIP', spend: '4.200.000đ', visits: 18 },
  ],
  promotions: [
    { id: 'KM001', name: 'Flash sale cuối tuần', period: '26/04 - 28/04', effect: '+18% đơn online', status: 'Đang chạy' },
  ],
  reportCards: [
    { title: 'Sản phẩm đang bán', value: '3', description: '3 sản phẩm đang được quản lý' },
  ],
};

const mockProducts = [
  { id: 'SP001', name: 'Atomic Habits', author: 'James Clear', category: 'Kỹ năng sống', price: '165.000đ', stock: 32, status: 'Đang bán' },
];

const mockStaffMembers = [
  { id: 'NS001', fullName: 'Nguyễn Thu Hà', role: 'Quản lý cửa hàng', email: 'thuha@bookstore.vn', phone: '0901234567', shift: 'Ca sáng', status: 'Đang làm việc' },
];

const mockOrders = [
  { id: '#DH1024', customer: 'Nguyễn Minh Châu', channel: 'Website', total: '420.000đ', state: 'Đang đóng gói' },
];

const mockCustomers = [
  { id: 'KH001', name: 'Nguyễn Thu Hà', segment: 'VIP', spend: '4.200.000đ', visits: 18 },
  { id: 'KH002', name: 'Phan Gia Huy', segment: 'Thành viên', spend: '1.580.000đ', visits: 9 },
];

const mockPromotions = [
  { id: 'KM001', name: 'Flash sale cuối tuần', period: '26/04 - 28/04', effect: '+18% đơn online', status: 'Đang chạy' },
];

beforeEach(() => {
  getDashboardData.mockResolvedValue(mockDashboardData);
  getProducts.mockResolvedValue(mockProducts);
  getStaffMembers.mockResolvedValue(mockStaffMembers);
  getOrders.mockResolvedValue(mockOrders);
  getCustomers.mockResolvedValue(mockCustomers);
  getPromotions.mockResolvedValue(mockPromotions);
  createProduct.mockImplementation(async (product) => ({ id: 'SP999', ...product }));
  createStaffMember.mockImplementation(async (staffMember) => ({ id: 'NS999', ...staffMember }));
  createOrder.mockImplementation(async (order) => ({ id: '#DH9999', ...order }));
  createCustomer.mockImplementation(async (customer) => ({ id: 'KH999', ...customer }));
  createPromotion.mockImplementation(async (promotion) => ({ id: 'KM999', ...promotion }));
});

test('renders bookstore admin heading', async () => {
  render(<App />);

  expect(screen.getByText(/Đang tải dữ liệu/i)).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /Trang quản lý nhà sách/i })).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /Danh mục sách cần theo dõi/i })).toBeInTheDocument();
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
});

test('creates a new staff member from staff admin page', async () => {
  render(<App />);

  fireEvent.click(await screen.findByRole('button', { name: /Nhân sự/i }));
  expect(await screen.findByText(/Nhân sự trong hệ thống/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Họ và tên/i), { target: { value: 'Phạm Hoàng Long' } });
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'long@bookstore.vn' } });
  fireEvent.change(screen.getByLabelText(/Số điện thoại/i), { target: { value: '0933555777' } });

  fireEvent.click(screen.getByRole('button', { name: /Tạo nhân sự/i }));

  expect(await screen.findByText(/Đã thêm nhân sự mới/i)).toBeInTheDocument();
  expect(await screen.findByText(/Phạm Hoàng Long/i)).toBeInTheDocument();
});

test('creates a new order from existing customers only', async () => {
  render(<App />);

  fireEvent.click(await screen.findByRole('button', { name: /Đơn hàng/i }));
  expect(await screen.findByText(/Đơn hàng trong hệ thống/i)).toBeInTheDocument();

  const customerSelect = screen.getByLabelText(/Khách hàng/i);
  const productSelect = screen.getByLabelText(/Sách/i);
  const totalInput = screen.getByLabelText(/Tổng tiền/i);
  expect(screen.getByRole('option', { name: 'Nguyễn Thu Hà' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Phan Gia Huy' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: 'Atomic Habits' })).toBeInTheDocument();

  fireEvent.change(customerSelect, { target: { value: 'Phan Gia Huy' } });
  fireEvent.change(productSelect, { target: { value: 'SP001' } });
  fireEvent.change(screen.getByLabelText(/Số lượng/i), { target: { value: '3' } });

  expect(totalInput).toHaveValue('495.000đ');
  fireEvent.click(screen.getByRole('button', { name: /Tạo đơn hàng/i }));

  expect(await screen.findByText(/Đã tạo đơn hàng mới/i)).toBeInTheDocument();
  expect(await screen.findAllByText(/Phan Gia Huy/i)).not.toHaveLength(0);
  expect(await screen.findAllByText(/Atomic Habits/i)).not.toHaveLength(0);
  expect(createOrder).toHaveBeenCalledWith({
    customer: 'Phan Gia Huy',
    productId: 'SP001',
    productName: 'Atomic Habits',
    quantity: 3,
    channel: 'Website',
    total: '495.000đ',
    state: 'Đang đóng gói',
  });
});

test('creates a new customer from customer admin page', async () => {
  render(<App />);

  fireEvent.click(await screen.findByRole('button', { name: /Khách hàng/i }));
  expect(await screen.findByText(/Khách hàng trong hệ thống/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Tên khách hàng/i), { target: { value: 'Đào Minh Anh' } });
  fireEvent.change(screen.getByLabelText(/Chi tiêu/i), { target: { value: '850.000đ' } });
  fireEvent.change(screen.getByLabelText(/Lượt mua/i), { target: { value: '4' } });
  fireEvent.click(screen.getByRole('button', { name: /Tạo khách hàng/i }));

  expect(await screen.findByText(/Đã thêm khách hàng mới/i)).toBeInTheDocument();
  expect(await screen.findByText(/Đào Minh Anh/i)).toBeInTheDocument();
});

test('creates a new promotion from promotion admin page', async () => {
  render(<App />);

  fireEvent.click(await screen.findByRole('button', { name: /Khuyến mãi/i }));
  expect(await screen.findByText(/Khuyến mãi trong hệ thống/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Tên chiến dịch/i), { target: { value: 'Giảm giá sinh nhật' } });
  fireEvent.change(screen.getByLabelText(/Thời gian/i), { target: { value: '10/05 - 12/05' } });
  fireEvent.change(screen.getByLabelText(/Hiệu quả/i), { target: { value: '+12% đơn tại quầy' } });
  fireEvent.click(screen.getByRole('button', { name: /Tạo khuyến mãi/i }));

  expect(await screen.findByText(/Đã tạo khuyến mãi mới/i)).toBeInTheDocument();
  expect(await screen.findByText(/Giảm giá sinh nhật/i)).toBeInTheDocument();
});
