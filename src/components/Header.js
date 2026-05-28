import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar expand="lg" className="site-header" sticky="top">
      <Container fluid className="px-0">
        <Navbar.Brand href="#home" className="brand">
          <span className="brand-mark">B</span>
          <span>
            <strong>BookNest</strong>
            <span>Kho sách trực tuyến</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="bookstore-navigation" />
        <Navbar.Collapse id="bookstore-navigation">
          <Nav className="main-nav mx-auto">
            <Nav.Link href="#categories">Danh mục</Nav.Link>
            <Nav.Link href="#featured">Sách nổi bật</Nav.Link>
            <Nav.Link href="#deals">Ưu đãi</Nav.Link>
            <Nav.Link href="#support">Hỗ trợ</Nav.Link>
          </Nav>

          <Button className="cart-button" type="button">
            Giỏ hàng <Badge bg="light">3</Badge>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
