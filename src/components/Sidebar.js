import { Badge, Card, ListGroup, ProgressBar } from 'react-bootstrap';

function Sidebar({ menuItems, activePage, onNavigate }) {
  return (
    <aside className="sidebar-panel h-100">
      <div>
        <p className="eyebrow">BookStore Admin</p>
        <h1 className="sidebar-title">Trang quản lý nhà sách</h1>
        <p className="sidebar-text">
          Theo dõi doanh thu, tồn kho và đơn hàng trong một màn hình duy nhất.
        </p>
      </div>

      <ListGroup variant="flush" className="menu-list">
        {menuItems.map((item) => (
          <ListGroup.Item
            key={item.id}
            action
            as="button"
            type="button"
            onClick={() => onNavigate(item.id)}
            className={item.id === activePage ? 'menu-item active' : 'menu-item'}
          >
            {item.label}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Card className="promo-card">
        <Card.Body>
          <Badge bg="warning" text="dark" className="mb-3">Mục tiêu tháng</Badge>
          <h3>78%</h3>
          <p className="text-black">Đã đạt 312 / 400 đơn hàng. Cần đẩy mạnh danh mục sách mới.</p>
          <ProgressBar now={78} variant="warning" />
        </Card.Body>
      </Card>
    </aside>
  );
}

export default Sidebar;
