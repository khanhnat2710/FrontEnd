import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

function OrderPanel({
  items,
  content,
  total,
  checkoutStatus,
  onCheckout,
  onChangeQuantity,
  onRemoveItem,
}) {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: content.paymentMethods?.[0] || '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setCustomer((currentCustomer) => ({ ...currentCustomer, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onCheckout(customer);
  }

  return (
    <aside className="order-panel" id="deals">
      <h2>{content.title}</h2>

      {items.length === 0 ? (
        <p className="empty-message">{content.emptyMessage}</p>
      ) : (
        items.map((item) => (
          <div className="order-item" key={item.id}>
            <div>
              <span>{item.title}</span>
              <strong>{item.price}</strong>
            </div>
            <div className="quantity-control">
              <Button type="button" onClick={() => onChangeQuantity(item.id, item.quantity - 1)}>
                -
              </Button>
              <span>{item.quantity}</span>
              <Button type="button" onClick={() => onChangeQuantity(item.id, item.quantity + 1)}>
                +
              </Button>
              <Button type="button" className="remove-button" onClick={() => onRemoveItem(item.id)}>
                Xóa
              </Button>
            </div>
          </div>
        ))
      )}

      <div className="voucher">
        <span>{content.voucherLabel}</span>
        <strong>{content.voucherCode}</strong>
      </div>
      <div className="total">
        <span>{content.totalLabel}</span>
        <strong>{total}</strong>
      </div>

      <Form className="checkout-form" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>{content.customerNameLabel}</Form.Label>
          <Form.Control name="name" value={customer.name} required onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>{content.phoneLabel}</Form.Label>
          <Form.Control name="phone" value={customer.phone} required onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>{content.addressLabel}</Form.Label>
          <Form.Control name="address" value={customer.address} required onChange={handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>{content.paymentLabel}</Form.Label>
          <Form.Select name="paymentMethod" value={customer.paymentMethod} onChange={handleChange}>
            {(content.paymentMethods || []).map((method) => (
              <option value={method} key={method}>
                {method}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        {checkoutStatus.message && (
          <p className={`checkout-status checkout-status-${checkoutStatus.type}`}>
            {checkoutStatus.message}
          </p>
        )}

        <Button type="submit" className="checkout-button" disabled={checkoutStatus.type === 'loading'}>
          {content.checkoutLabel}
        </Button>
      </Form>
    </aside>
  );
}

export default OrderPanel;
