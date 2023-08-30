import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

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
              <Nav.Link
                as={Link}
                to="/"
                className={`${location.pathname == "/" ? "active" : ""}`}
              >
                Trang chủ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/products"
                className={`${
                  location.pathname.startsWith("/products") ? "active" : ""
                }`}
              >
                Sản phẩm
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/contact"
                className={`${
                  location.pathname.startsWith("/contact") ? "active" : ""
                }`}
              >
                Liên hệ
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/cart"
                className={`${
                  location.pathname.startsWith("/cart") ? "active" : ""
                }`}
              >
                Giỏ hàng
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/tracking-order"
                className={`${
                  location.pathname.startsWith("/tracking-order")
                    ? "active"
                    : ""
                }`}
              >
                Kiểm tra đơn hàng
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
