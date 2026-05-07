import { Badge, Card, Col, Row } from 'react-bootstrap';

function SummarySection({ summaryCards }) {
  return (
    <section className="mt-4">
      <Row className="g-3">
        {summaryCards.map((item) => (
          <Col md={6} xl={3} key={item.title}>
            <Card className="summary-card">
              <Card.Body>
                <p>{item.title}</p>
                <div className="summary-row">
                  <h3>{item.value}</h3>
                  <Badge bg={item.tone}>{item.change}</Badge>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default SummarySection;
