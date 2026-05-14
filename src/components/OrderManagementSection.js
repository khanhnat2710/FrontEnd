import { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';

const defaultFormState = {
  customer: '',
  productId: '',
  channel: 'Website',
  quantity: 1,
  total: '',
  state: 'Đang đóng gói',
};

const salesChannels = ['Website', 'Shopee', 'Facebook', 'Tại cửa hàng'];
const orderStates = ['Đang đóng gói', 'Đang xử lý', 'Chờ thanh toán', 'Đã giao'];

function parsePrice(price) {
  return Number(String(price).replace(/[^\d]/g, '')) || 0;
}

function formatPrice(value) {
  return `${new Intl.NumberFormat('vi-VN').format(value)}đ`;
}

function createDefaultForm(customers, products) {
  const firstCustomer = customers[0]?.name || '';
  const firstProduct = products[0];

  return {
    ...defaultFormState,
    customer: firstCustomer,
    productId: firstProduct?.id || '',
    total: firstProduct ? formatPrice(parsePrice(firstProduct.price)) : '',
  };
}

function getBadgeVariant(state) {
  if (state === 'Đã giao') {
    return 'success';
  }

  if (state === 'Chờ thanh toán') {
    return 'warning';
  }

  return 'secondary';
}

function OrderManagementSection({ customers, orders, products, onCreateOrder, onDeleteOrder, onUpdateOrder }) {
  const [formState, setFormState] = useState(() => createDefaultForm(customers, products));
  const [editingOrderId, setEditingOrderId] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (!editingOrderId) {
      setFormState((current) => ({
        ...createDefaultForm(customers, products),
        customer: current.customer || customers[0]?.name || '',
        productId: current.productId || products[0]?.id || '',
      }));
    }
  }, [customers, editingOrderId, products]);

  const selectedProduct = products.find((product) => product.id === formState.productId);

  useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    const nextTotal = formatPrice(parsePrice(selectedProduct.price) * Number(formState.quantity || 0));
    setFormState((current) => (current.total === nextTotal ? current : { ...current, total: nextTotal }));
  }, [formState.quantity, selectedProduct]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: name === 'quantity' ? Number(value) : value }));
  };

  const resetForm = () => {
    setFormState(createDefaultForm(customers, products));
    setEditingOrderId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedProduct) {
      return;
    }

    const payload = {
      customer: formState.customer,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity: Number(formState.quantity),
      channel: formState.channel,
      total: formState.total,
      state: formState.state,
    };

    if (editingOrderId) {
      await onUpdateOrder(editingOrderId, payload);
      setFeedbackMessage('Đã cập nhật đơn hàng.');
    } else {
      await onCreateOrder(payload);
      setFeedbackMessage('Đã tạo đơn hàng mới.');
    }

    resetForm();
  };

  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setFormState({
      customer: order.customer,
      productId: order.productId || products[0]?.id || '',
      channel: order.channel,
      quantity: Number(order.quantity || 1),
      total: order.total,
      state: order.state,
    });
    setFeedbackMessage(`Đang chỉnh sửa: ${order.id}`);
  };

  const handleDelete = async (orderId) => {
    await onDeleteOrder(orderId);
    if (editingOrderId === orderId) {
      resetForm();
    }
    setFeedbackMessage('Đã xóa đơn hàng.');
  };

  return (
    <section className="mt-4">
      <Row className="g-4">
        <Col xl={5}>
          <Card className="data-card h-100">
            <Card.Body>
              <div className="section-head">
                <div>
                  <p className="section-kicker">Biểu mẫu</p>
                  <h3>{editingOrderId ? 'Cập nhật đơn hàng' : 'Tạo đơn hàng mới'}</h3>
                </div>
              </div>

              <Form className="product-form" onSubmit={handleSubmit}>
                <Form.Group controlId="order-customer">
                  <Form.Label>Khách hàng</Form.Label>
                  <Form.Select name="customer" value={formState.customer} onChange={handleChange} required>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.name}>
                        {customer.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="order-product">
                  <Form.Label>Sách</Form.Label>
                  <Form.Select name="productId" value={formState.productId} onChange={handleChange} required>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group controlId="order-channel">
                      <Form.Label>Kênh bán</Form.Label>
                      <Form.Select name="channel" value={formState.channel} onChange={handleChange}>
                        {salesChannels.map((channel) => (
                          <option key={channel} value={channel}>
                            {channel}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="order-quantity">
                      <Form.Label>Số lượng</Form.Label>
                      <Form.Control name="quantity" type="number" min="1" value={formState.quantity} onChange={handleChange} required />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="order-total">
                  <Form.Label>Tổng tiền</Form.Label>
                  <Form.Control name="total" value={formState.total} readOnly plaintext={false} />
                </Form.Group>
                <Form.Group controlId="order-state">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select name="state" value={formState.state} onChange={handleChange}>
                    {orderStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <div className="hero-actions mt-4">
                  <Button type="submit" variant="dark">{editingOrderId ? 'Lưu thay đổi' : 'Tạo đơn hàng'}</Button>
                  <Button type="button" variant="outline-dark" onClick={resetForm}>Làm mới</Button>
                </div>
              </Form>
              {feedbackMessage ? <p className="product-feedback mb-0 mt-3">{feedbackMessage}</p> : null}
            </Card.Body>
          </Card>
        </Col>
        <Col xl={7}>
          <Card className="data-card h-100">
            <Card.Body>
              <div className="section-head">
                <div>
                  <p className="section-kicker">Danh sách</p>
                  <h3>Đơn hàng trong hệ thống</h3>
                </div>
              </div>
              <Table responsive hover className="align-middle custom-table">
                <thead>
                  <tr>
                    <th>Mã</th>
                    <th>Khách hàng</th>
                    <th>Sách</th>
                    <th>Kênh</th>
                    <th>Tổng tiền</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>
                        <strong>{order.productName || 'Chưa gán sách'}</strong>
                        <div className="table-subtext">Số lượng: {order.quantity || 1}</div>
                      </td>
                      <td>{order.channel}</td>
                      <td>{order.total}</td>
                      <td>
                        <Badge bg={getBadgeVariant(order.state)}>{order.state}</Badge>
                      </td>
                      <td>
                        <div className="table-actions">
                          <Button variant="outline-dark" size="sm" onClick={() => handleEdit(order)}>Sửa</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(order.id)}>Xóa</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default OrderManagementSection;
