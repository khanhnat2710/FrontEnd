import { Button } from 'react-bootstrap';

// OrderPanel nhận prop items là danh sách sách đang có trong giỏ hàng mẫu.
function OrderPanel({ items }) {
  return (
    <aside className="order-panel" id="deals">
      <h2>Đơn hàng của bạn</h2>

      {/* map lặp qua từng item để hiển thị tên sách và giá trong phần tóm tắt đơn hàng. */}
      {items.map((item) => (
        <div className="order-item" key={item.title}>
          <span>{item.title}</span>
          <strong>{item.price}</strong>
        </div>
      ))}

      {/* Voucher đang là dữ liệu tĩnh; có thể đổi thành input nhập mã giảm giá ở bước sau. */}
      <div className="voucher">
        <span>Mã giảm giá</span>
        <strong>BOOK10</strong>
      </div>

      {/* Tạm tính hiện được nhập thủ công, chưa tự cộng từ mảng items. */}
      <div className="total">
        <span>Tạm tính</span>
        <strong>211.000đ</strong>
      </div>

      {/* Nút thanh toán hiện chỉ là giao diện, chưa gắn hàm xử lý đặt hàng. */}
      <Button type="button" className="checkout-button">
        Thanh toán
      </Button>
    </aside>
  );
}

export default OrderPanel;
