import { useState } from 'react';
import { Badge, Button, Card, Col, Form, Row, Table } from 'react-bootstrap';

const defaultFormState = {
  name: '',
  period: '',
  effect: '',
  status: 'Đang chạy',
};

function PromotionManagementSection({ promotions, onCreatePromotion, onDeletePromotion, onUpdatePromotion }) {
  const [formState, setFormState] = useState(defaultFormState);
  const [editingPromotionId, setEditingPromotionId] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setFormState(defaultFormState);
    setEditingPromotionId('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingPromotionId) {
      await onUpdatePromotion(editingPromotionId, formState);
      setFeedbackMessage('Đã cập nhật khuyến mãi.');
    } else {
      await onCreatePromotion(formState);
      setFeedbackMessage('Đã tạo khuyến mãi mới.');
    }

    resetForm();
  };

  const handleEdit = (promotion) => {
    setEditingPromotionId(promotion.id);
    setFormState({
      name: promotion.name,
      period: promotion.period,
      effect: promotion.effect,
      status: promotion.status,
    });
    setFeedbackMessage(`Đang chỉnh sửa: ${promotion.name}`);
  };

  const handleDelete = async (promotionId) => {
    await onDeletePromotion(promotionId);
    if (editingPromotionId === promotionId) {
      resetForm();
    }
    setFeedbackMessage('Đã xóa khuyến mãi.');
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
                  <h3>{editingPromotionId ? 'Cập nhật khuyến mãi' : 'Tạo khuyến mãi mới'}</h3>
                </div>
              </div>
              <Form className="product-form" onSubmit={handleSubmit}>
                <Form.Group controlId="promotion-name">
                  <Form.Label>Tên chiến dịch</Form.Label>
                  <Form.Control name="name" value={formState.name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group controlId="promotion-period">
                  <Form.Label>Thời gian</Form.Label>
                  <Form.Control name="period" value={formState.period} onChange={handleChange} placeholder="10/05 - 20/05" required />
                </Form.Group>
                <Form.Group controlId="promotion-effect">
                  <Form.Label>Hiệu quả</Form.Label>
                  <Form.Control name="effect" value={formState.effect} onChange={handleChange} placeholder="+15% đơn online" required />
                </Form.Group>
                <Form.Group controlId="promotion-status">
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select name="status" value={formState.status} onChange={handleChange}>
                    <option value="Đang chạy">Đang chạy</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                    <option value="Kết thúc">Kết thúc</option>
                  </Form.Select>
                </Form.Group>
                <div className="hero-actions mt-4">
                  <Button type="submit" variant="dark">{editingPromotionId ? 'Lưu thay đổi' : 'Tạo khuyến mãi'}</Button>
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
                  <h3>Khuyến mãi trong hệ thống</h3>
                </div>
              </div>
              <Table responsive hover className="align-middle custom-table">
                <thead>
                  <tr>
                    <th>Mã</th>
                    <th>Chiến dịch</th>
                    <th>Thời gian</th>
                    <th>Hiệu quả</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {promotions.map((promotion) => (
                    <tr key={promotion.id}>
                      <td>{promotion.id}</td>
                      <td>{promotion.name}</td>
                      <td>{promotion.period}</td>
                      <td>{promotion.effect}</td>
                      <td><Badge bg={promotion.status === 'Đang chạy' ? 'warning' : promotion.status === 'Tạm dừng' ? 'secondary' : 'dark'} text="dark">{promotion.status}</Badge></td>
                      <td>
                        <div className="table-actions">
                          <Button variant="outline-dark" size="sm" onClick={() => handleEdit(promotion)}>Sửa</Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(promotion.id)}>Xóa</Button>
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

export default PromotionManagementSection;
