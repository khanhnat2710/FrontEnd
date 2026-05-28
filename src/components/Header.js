import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap';

function Header({ data, cartCount }) {
  const navItems = data.navItems || [];

  return (
    <Navbar expand="lg" className="site-header" sticky="top">
      <Container fluid className="px-0">
        <Navbar.Brand href="#home" className="brand">
          <span className="brand-mark">B</span>
          <span>
            <strong>{data.brandName}</strong>
            <span>{data.tagline}</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="bookstore-navigation" />
        <Navbar.Collapse id="bookstore-navigation">
          <Nav className="main-nav mx-auto">
            {navItems.map((item) => (
              <Nav.Link href={item.href} key={item.href}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          <Button className="cart-button" type="button">
            {data.cartLabel} <Badge bg="light">{cartCount}</Badge>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
