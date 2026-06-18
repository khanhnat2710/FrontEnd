import { useMemo, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const voucherCodes = {
  BOOK10: 0.1,
  FREESHIP: 0.05,
};

const shippingFees = {
  express: 25000,
  standard: 12000,
};

function OrderPanel({
  formatCurrency,
  items,
  onCheckoutSuccess,
  onRemoveItem,
  onUpdateQuantity,
}) {
  const [voucher, setVoucher] = useState('BOOK10');
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    method: 'standard',
  });
  const [checkoutStatus, setCheckoutStatus] = useState('');

  // Tạm tính bằng tổng giá từng sách nhân với số lượng trong giỏ.
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );

  // Chuẩn hóa mã giảm giá để người dùng nhập chữ hoa/thường đều được áp dụng.
  const normalizedVoucher = voucher.trim().toUpperCase();
  const discountRate = voucherCodes[normalizedVoucher] || 0;

  // Làm tròn tiền giảm để tổng đơn luôn là số nguyên VND.
  const discount = Math.round(subtotal * discountRate);
  const shippingFee = shippingFees[customer.method] || shippingFees.standard;

  // Chỉ cộng phí vận chuyển khi giỏ có sản phẩm và chặn tổng tiền không xuống dưới 0.
  const payableShippingFee = items.length ? shippingFee : 0;
  const total = Math.max(0, subtotal - discount + payableShippingFee);

  const handleCustomerChange = (field, value) => {
    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [field]: value,
    }));
  };

  const handleCheckout = (event) => {
    event.preventDefault();

    if (!items.length) {
      setCheckoutStatus('Vui lòng thêm ít nhất một cuốn sách vào giỏ.');
      return;
    }

    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setCheckoutStatus('Vui lòng nhập đủ tên, số điện thoại và địa chỉ nhận hàng.');
      return;
    }

    onCheckoutSuccess(total);
  };

  return (
    <aside className="order-panel">
      <h2>Đơn hàng của bạn</h2>

      <div className="cart-list">
        {items.length > 0 ? (
          items.map((item) => (
            <div className="order-item" key={item.id}>
              <div>
                <strong>{item.title}</strong>
                <span>{formatCurrency(item.price)}</span>
              </div>

              <div className="quantity-control">
                <Button
                  type="button"
                  aria-label={`Giảm số lượng ${item.title}`}
                  onClick={() => onUpdateQuantity(item.id, 'decrease')}
                >
                  -
                </Button>
                <span>{item.quantity}</span>
                <Button
                  type="button"
                  aria-label={`Tăng số lượng ${item.title}`}
                  onClick={() => onUpdateQuantity(item.id, 'increase')}
                >
                  +
                </Button>
                <Button
                  className="remove-button"
                  type="button"
                  aria-label={`Xóa ${item.title}`}
                  onClick={() => onRemoveItem(item.id)}
                >
                  x
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-message">Giỏ hàng đang trống.</p>
        )}
      </div>

      <Form className="checkout-form" onSubmit={handleCheckout}>
        <Form.Group controlId="voucher-code">
          <Form.Label>Mã giảm giá</Form.Label>
          <Form.Control
            type="text"
            value={voucher}
            onChange={(event) => setVoucher(event.target.value)}
            placeholder="BOOK10 hoặc FREESHIP"
          />
        </Form.Group>

        <div className="bill-summary">
          <div>
            <span>Tạm tính</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div>
            <span>Giảm giá</span>
            <strong>-{formatCurrency(discount)}</strong>
          </div>
          <div>
            <span>Vận chuyển</span>
            <strong>{formatCurrency(payableShippingFee)}</strong>
          </div>
          <div className="total">
            <span>Tổng cộng</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </div>

        <Form.Group controlId="customer-name">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            type="text"
            value={customer.name}
            onChange={(event) => handleCustomerChange('name', event.target.value)}
            placeholder="Nguyễn Minh Anh"
          />
        </Form.Group>

        <Form.Group controlId="customer-phone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="tel"
            value={customer.phone}
            onChange={(event) => handleCustomerChange('phone', event.target.value)}
            placeholder="090..."
          />
        </Form.Group>

        <Form.Group controlId="customer-address">
          <Form.Label>Địa chỉ nhận hàng</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            value={customer.address}
            onChange={(event) => handleCustomerChange('address', event.target.value)}
            placeholder="Số nhà, đường, phường/xã, quận/huyện"
          />
        </Form.Group>

        <Form.Group controlId="shipping-method">
          <Form.Label>Phương thức giao hàng</Form.Label>
          <Form.Select
            value={customer.method}
            onChange={(event) => handleCustomerChange('method', event.target.value)}
          >
            <option value="standard">Tiêu chuẩn - 12.000đ</option>
            <option value="express">Nhanh trong ngày - 25.000đ</option>
          </Form.Select>
        </Form.Group>

        {checkoutStatus ? <p className="checkout-status">{checkoutStatus}</p> : null}

        <Button type="submit" className="checkout-button">
          Đặt sách
        </Button>
      </Form>
    </aside>
  );
}

export default OrderPanel;
