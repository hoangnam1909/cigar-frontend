import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <Navbar
        fixed="top"
        bg="dark"
        data-bs-theme="dark"
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            style={{ fontFamily: "Lilita One, cursive" }}
          >
            <img
              alt="brand-logo"
              src="https://res.cloudinary.com/nhn1909/image/upload/v1690041731/ktypjs6ap3ykjv6eydqu.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            CIGAR FOR BOSS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link as={Link} to="/">
                Trang chủ
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Sản phẩm
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Liên hệ
              </Nav.Link>
              <Nav.Link as={Link} to="/cart">
                Giỏ hàng
              </Nav.Link>
              <Nav.Link as={Link} to="/track-order">
                Kiểm tra đơn hàng
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
