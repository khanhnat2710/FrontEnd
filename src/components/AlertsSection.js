import { Button, Card, Form } from 'react-bootstrap';

function AlertsSection({ alerts }) {
  return (
    <Card className="data-card h-100">
      <Card.Body>
        <div className="section-head">
          <div>
            <p className="section-kicker">Cảnh báo</p>
            <h3>Việc cần xử lý ngay</h3>
          </div>
        </div>

        <div className="alert-stack">
          {alerts.map((item) => (
            <div className="alert-item" key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.detail}</span>
            </div>
          ))}
        </div>

        <Form className="mt-4">
          <Form.Label className="section-kicker mb-2">Ghi chú nhanh</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Nhập ghi chú cho ca làm việc..." />
          <Button className="mt-3 w-100" variant="dark">Lưu ghi chú</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AlertsSection;
