import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';

// Mảng navItems gom toàn bộ link menu vào một chỗ để dễ bảo trì.
// Nếu muốn thêm mục menu mới, chỉ cần thêm một object { href, label } vào mảng này.
const navItems = [
  { href: '#categories', label: 'Danh mục' },
  { href: '#featured', label: 'Sách nổi bật' },
  { href: '#deals', label: 'Ưu đãi' },
  { href: '#support', label: 'Hỗ trợ' },
];

// Header dùng component của react-bootstrap để tạo thanh điều hướng responsive.
function Header() {
  return (
    <Navbar expand="lg" className="site-header" sticky="top">
      <Container fluid className="px-0">
        {/* Navbar.Brand là phần nhận diện thương hiệu ở bên trái: logo chữ B và tên BookNest. */}
        <Navbar.Brand href="#home" className="brand">
          <span className="brand-mark">B</span>
          <span>
            <strong>BookNest</strong>
            <span>Kho sách trực tuyến</span>
          </span>
        </Navbar.Brand>

        {/* Toggle chỉ hiện trên màn hình nhỏ, giúp mở/đóng menu mobile. */}
        <Navbar.Toggle aria-controls="bookstore-navigation" />

        {/* Collapse bọc phần menu để react-bootstrap tự thu gọn khi màn hình hẹp. */}
        <Navbar.Collapse id="bookstore-navigation">
          <Nav className="main-nav mx-auto">
            {/* map biến từng object trong navItems thành một Nav.Link trên giao diện. */}
            {navItems.map((item) => (
              <Nav.Link href={item.href} key={item.href}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Badge hiển thị số lượng sản phẩm trong giỏ hàng. Hiện tại số 3 là dữ liệu tĩnh. */}
          <Button className="cart-button" type="button">
            Giỏ hàng <Badge bg="light">3</Badge>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
