import { Button, Card, Col, Row } from 'react-bootstrap';

function HeroSection() {
  return (
    <section className="hero-panel">
      <Row className="align-items-center g-4">
        <Col lg={8}>
          <p className="eyebrow">Hệ thống bán sách đa kênh</p>
          <h2>Điều hành cửa hàng sách nhanh, rõ, dễ mở rộng</h2>
          <p className="hero-text">
            Kiểm soát doanh thu, tồn kho và nhân sự tại cửa hàng. Giao diện ưu tiên thao tác nhanh cho quản lý và thu ngân.
          </p>
          <div className="hero-actions">
            <Button variant="dark" size="lg">Tạo đơn nhập sách</Button>
            <Button variant="outline-dark" size="lg">Xem báo cáo ngày</Button>
          </div>
        </Col>
        <Col lg={4}>
          <Card className="spotlight-card">
            <Card.Body>
              <p className="spotlight-label">Sách nổi bật tuần này</p>
              <h3>Atomic Habits</h3>
              <p className="mb-4">Doanh số tăng 24%, dự kiến cần bổ sung 120 bản trong 5 ngày tới.</p>
              <div className="spotlight-metrics">
                <div>
                  <strong>1.248</strong>
                  <span>bản đã bán</span>
                </div>
                <div>
                  <strong>92%</strong>
                  <span>tỉ lệ chuyển đổi</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>
  );
}

export default HeroSection;
