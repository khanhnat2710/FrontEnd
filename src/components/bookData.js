// Dữ liệu mẫu của web. Khi cần đổi nội dung hiển thị, chỉ cần sửa file này.
// Tách dữ liệu khỏi component giúp JSX gọn hơn và dễ tái sử dụng ở nhiều nơi.
export const categories = ['Văn học', 'Kinh tế', 'Kỹ năng sống', 'Thiếu nhi', 'Sách mới'];

// Mỗi object trong books đại diện cho một sách được hiển thị ở khu vực "Sách nổi bật".
export const books = [
  {
    // title: tên sách hiển thị trên card và trên bìa giả lập.
    title: 'Nhà Giả Kim',
    // author: tên tác giả hiển thị dưới tiêu đề sách.
    author: 'Paulo Coelho',
    // price: giá bán dạng chuỗi để giữ định dạng tiền Việt Nam.
    price: '79.000đ',
    // tag: nhãn nhỏ trên bìa, ví dụ "Bán chạy" hoặc "Mới".
    tag: 'Bán chạy',
    // color: màu nền của bìa sách trong BookCard.
    color: '#315f72',
  },
  {
    title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    author: 'Rosie Nguyễn',
    price: '88.000đ',
    tag: 'Gợi ý',
    color: '#8a4f3d',
  },
  {
    title: 'Đắc Nhân Tâm',
    author: 'Dale Carnegie',
    price: '96.000đ',
    tag: 'Kinh điển',
    color: '#536a3f',
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    price: '132.000đ',
    tag: 'Mới',
    color: '#6f5875',
  },
];

// cartItems là dữ liệu mẫu cho khung "Đơn hàng của bạn".
// Hiện tại chỉ lưu title và price vì OrderPanel chỉ cần hai thông tin này để render.
export const cartItems = [
  {
    title: 'Nhà Giả Kim',
    price: '79.000đ',
  },
  {
    title: 'Atomic Habits',
    price: '132.000đ',
  },
];
