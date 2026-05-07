import { Badge, Card } from 'react-bootstrap';

function OrdersSection({ orders }) {
  return (
    <Card className="data-card h-100">
      <Card.Body>
        <div className="section-head">
          <div>
            <p className="section-kicker">Đơn hàng gần đây</p>
            <h3>Trạng thái bán hàng theo kênh</h3>
          </div>
        </div>
        <div className="order-list">
          {orders.map((order) => (
            <div className="order-row" key={order.id}>
              <div>
                <strong>{order.id}</strong>
                <span>{order.customer}</span>
              </div>
              <div>
                <strong>{order.total}</strong>
                <span>{order.channel}</span>
              </div>
              <Badge bg="light" text="dark">{order.state}</Badge>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default OrdersSection;
