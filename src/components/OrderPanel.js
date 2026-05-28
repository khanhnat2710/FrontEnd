import { Button } from 'react-bootstrap';

function OrderPanel({ items }) {
  return (
    <aside className="order-panel" id="deals">
      <h2>Đơn hàng của bạn</h2>
      {items.map((item) => (
        <div className="order-item" key={item.title}>
          <span>{item.title}</span>
          <strong>{item.price}</strong>
        </div>
      ))}
      <div className="voucher">
        <span>Mã giảm giá</span>
        <strong>BOOK10</strong>
      </div>
      <div className="total">
        <span>Tạm tính</span>
        <strong>211.000đ</strong>
      </div>
      <Button type="button" className="checkout-button">
        Thanh toán
      </Button>
    </aside>
  );
}

export default OrderPanel;
