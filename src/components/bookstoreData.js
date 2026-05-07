export const menuItems = [
  { id: 'tong-quan', label: 'Tổng quan' },
  { id: 'kho-sach', label: 'Kho sách' },
  { id: 'don-hang', label: 'Đơn hàng' },
  { id: 'khach-hang', label: 'Khách hàng' },
  { id: 'khuyen-mai', label: 'Khuyến mãi' },
  { id: 'bao-cao', label: 'Báo cáo' },
];

export const summaryCards = [
  { title: 'Doanh thu hôm nay', value: '24.8 triệu', change: '+12%', tone: 'success' },
  { title: 'Đơn hàng mới', value: '86', change: '+18 đơn', tone: 'warning' },
  { title: 'Sách sắp hết', value: '14', change: 'Cần nhập thêm', tone: 'danger' },
  { title: 'Thành viên mới', value: '32', change: '7 VIP', tone: 'info' },
];

export const featuredBooks = [
  { name: 'Nhà giả kim', author: 'Paulo Coelho', stock: 42, price: '89.000đ', status: 'Bán chạy' },
  { name: 'Tư duy nhanh và chậm', author: 'Daniel Kahneman', stock: 18, price: '189.000đ', status: 'Sắp hết' },
  { name: 'Đắc nhân tâm', author: 'Dale Carnegie', stock: 57, price: '76.000đ', status: 'Ổn định' },
  { name: 'Muôn kiếp nhân sinh', author: 'Nguyên Phong', stock: 11, price: '168.000đ', status: 'Cần nhập' },
];

export const orders = [
  { id: '#DH1024', customer: 'Nguyễn Minh Châu', channel: 'Website', total: '420.000đ', state: 'Đang đóng gói' },
  { id: '#DH1025', customer: 'Trần Bảo Hân', channel: 'Shopee', total: '285.000đ', state: 'Đã giao' },
  { id: '#DH1026', customer: 'Lê Hoàng Nam', channel: 'Tại cửa hàng', total: '650.000đ', state: 'Chờ thanh toán' },
  { id: '#DH1027', customer: 'Phạm Quỳnh Như', channel: 'Facebook', total: '315.000đ', state: 'Đang xử lý' },
];

export const alerts = [
  { label: 'Sách giáo khoa lớp 12', detail: 'Còn 6 cuốn trong kho trung tâm' },
  { label: 'Combo thiếu nhi mùa hè', detail: 'Tốc độ bán tăng 35% trong 3 ngày' },
  { label: 'Hóa đơn nhà cung cấp', detail: 'Cần xác nhận trước 17:00 hôm nay' },
];

export const staffTasks = [
  { label: 'Cập nhật giá khu kinh tế', progress: 82 },
  { label: 'Kiểm kê kệ văn học', progress: 61 },
  { label: 'Tạo mã giảm giá 30/4', progress: 47 },
];

export const customers = [
  { name: 'Nguyễn Thu Hà', segment: 'VIP', spend: '4.200.000đ', visits: 18 },
  { name: 'Phan Gia Huy', segment: 'Thành viên', spend: '1.580.000đ', visits: 9 },
  { name: 'Lê Trúc Linh', segment: 'Mới', spend: '620.000đ', visits: 3 },
];

export const promotions = [
  { name: 'Flash sale cuối tuần', period: '26/04 - 28/04', effect: '+18% đơn online' },
  { name: 'Mua 2 tặng 1 sách thiếu nhi', period: '01/05 - 07/05', effect: '+26% lượt mua tại quầy' },
  { name: 'Voucher khách hàng mới', period: 'Đang chạy', effect: 'Tỉ lệ quay lại 31%' },
];

export const reportCards = [
  { title: 'Doanh thu tuần', value: '168 triệu', description: 'Tăng 14% so với tuần trước' },
  { title: 'Biên lợi nhuận', value: '32%', description: 'Ổn định ở nhóm sách kỹ năng' },
  { title: 'Vòng quay tồn kho', value: '21 ngày', description: 'Cần tối ưu thêm ở nhóm giáo khoa' },
];

export const dashboardData = {
  summaryCards,
  featuredBooks,
  orders,
  alerts,
  staffTasks,
  customers,
  promotions,
  reportCards,
};
