import { useState } from 'react';
import { Badge, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';

const defaultFormState = {
  name: '',
  segment: 'Thành viên',
  spend: '',
  visits: '',
};

function CustomerManagementSection({ customers, onCreateCustomer, onDeleteCustomer, onUpdateCustomer }) {
  const [formState, setFormState] = useState(defaultFormState);
  const [editingCustomerId, setEditingCustomerId] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormState(defaultFormState);
    setEditingCustomerId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formState, visits: Number(formState.visits) };

    if (editingCustomerId) {
      await onUpdateCustomer(editingCustomerId, payload);
      setFeedbackMessage('Đã cập nhật khách hàng.');
    } else {
      await onCreateCustomer(payload);
      setFeedbackMessage('Đã thêm khách hàng mới.');
    }

    resetForm();
  };

  const handleEdit = (customer) => {
    setEditingCustomerId(customer.id);
    setFormState({
      name: customer.name,
      segment: customer.segment,
      spend: customer.spend,
      visits: String(customer.visits),
    });
    setFeedbackMessage(`Đang chỉnh sửa: ${customer.name}`);
  };

  const handleDelete = async (customerId) => {
    await onDeleteCustomer(customerId);
    if (editingCustomerId === customerId) {
      resetForm();
    }
    setFeedbackMessage('Đã xóa khách hàng.');
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
                  <h3>{editingCustomerId ? 'Cập nhật khách hàng' : 'Thêm khách hàng mới'}</h3>
                </div>
              </div>

              <Form className="product-form" onSubmit={handleSubmit}>
                <Form.Group controlId="customer-name">
                  <Form.Label>Tên khách hàng</Form.Label>
                  <Form.Control name="name" value={formState.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="customer-segment">
                  <Form.Label>Phân khúc</Form.Label>
                  <Form.Select name="segment" value={formState.segment} onChange={handleChange}>
                    <option value="VIP">VIP</option>
                    <option value="Thành viên">Thành viên</option>
                    <option value="Mới">Mới</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="customer-spend">
                  <Form.Label>Chi tiêu</Form.Label>
                  <Form.Control name="spend" value={formState.spend} onChange={handleChange} placeholder="1.200.000đ" required />
                </Form.Group>
                <Form.Group controlId="customer-visits">
                  <Form.Label>Lượt mua</Form.Label>
                  <Form.Control name="visits" type="number" min="0" value={formState.visits} onChange={handleChange} required />
                </Form.Group>
                <div className="hero-actions mt-4">
                  <Button type="submit" variant="dark">{editingCustomerId ? 'Lưu thay đổi' : 'Tạo khách hàng'}</Button>
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
                  <h3>Khách hàng trong hệ thống</h3>
                </div>
              </div>
              <Table responsive hover className="align-middle custom-table">
                <thead>
                  <tr>
                    <th>Mã</th>
                    <th>Tên khách hàng</th>
                    <th>Phân khúc</th>
                    <th>Chi tiêu</th>
                    <th>Lượt mua</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td><Badge bg={customer.segment === 'VIP' ? 'dark' : customer.segment === 'Mới' ? 'info' : 'secondary'}>{customer.segment}</Badge></td>
                      <td>{customer.spend}</td>
                      <td>{customer.visits}</td>
                      <td>
                        <div className="table-actions">
                          <Button variant="outline-dark" size="sm" onClick={() => handleEdit(customer)}>Sửa</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(customer.id)}>Xóa</Button>
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

export default CustomerManagementSection;
