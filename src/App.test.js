import { render, screen } from '@testing-library/react';
import App from './App';
import { getBookstoreData } from './services/bookstoreApi';

jest.mock('./services/bookstoreApi', () => ({
  getBookstoreData: jest.fn(),
  searchBooks: jest.fn(),
  checkoutOrder: jest.fn(),
}));

test('renders bookstore customer interface from API data', async () => {
  getBookstoreData.mockResolvedValue({
    header: {
      brandName: 'BookNest',
      tagline: 'Kho sách trực tuyến',
      cartLabel: 'Giỏ hàng',
      navItems: [
        { label: 'Danh mục', href: '#categories' },
        { label: 'Sách nổi bật', href: '#featured' },
      ],
    },
    hero: {
      eyebrow: 'Giao nhanh trong 2 giờ tại nội thành',
      title: 'Tìm cuốn sách tiếp theo cho kệ sách của bạn',
      description: 'Mua sách với gợi ý rõ ràng.',
      searchPlaceholder: 'Tìm tên sách, tác giả, ISBN...',
      searchButton: 'Tìm sách',
      showcaseLabel: 'Sách đang được quan tâm',
      coverBrand: 'BookNest',
      coverTitle: 'Sách mới mỗi ngày',
      dealLabel: 'Ưu đãi hôm nay',
      dealText: 'Giảm đến 35%',
    },
    categories: ['Tất cả', 'Văn học'],
    books: [
      {
        id: 1,
        title: 'Nhà Giả Kim',
        author: 'Paulo Coelho',
        category: 'Văn học',
        price: '79.000đ',
        priceValue: 79000,
        tag: 'Bán chạy',
        stock: 18,
        color: '#315f72',
      },
    ],
    cartItems: [{ id: 1, quantity: 1 }],
    featured: {
      eyebrow: 'Lựa chọn phổ biến',
      title: 'Sách nổi bật',
      viewAllLabel: 'Hiển thị tất cả',
      emptyMessage: 'Không tìm thấy sách phù hợp.',
    },
    order: {
      title: 'Đơn hàng của bạn',
      emptyMessage: 'Giỏ hàng đang trống.',
      voucherLabel: 'Mã giảm giá',
      voucherCode: 'BOOK10',
      totalLabel: 'Tạm tính',
      checkoutLabel: 'Thanh toán',
      customerNameLabel: 'Họ tên',
      phoneLabel: 'Số điện thoại',
      addressLabel: 'Địa chỉ giao hàng',
      paymentLabel: 'Phương thức thanh toán',
      paymentMethods: ['Thanh toán khi nhận hàng'],
      successMessage: 'Đặt hàng thành công. Mã đơn hàng:',
      errorMessage: 'Không thể tạo đơn hàng. Vui lòng thử lại.',
    },
    bookCard: {
      addLabel: 'Thêm',
      stockLabel: 'Còn',
    },
  });

  render(<App />);

  expect(await screen.findByText(/Tìm cuốn sách tiếp theo/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Sách nổi bật/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /Đơn hàng của bạn/i })).toBeInTheDocument();
});
