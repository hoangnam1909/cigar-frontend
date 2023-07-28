import { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const [keyword, setKeyword] = useState("");

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
            </Nav>
            <Form className="d-flex ms-3">
              <Form.Control
                type="search"
                placeholder="Từ khoá"
                className="me-2"
                style={{ width: "200px" }}
                aria-label="Search"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <Button
                variant="outline-secondary"
                style={{ width: "130px" }}
                as={Link}
                to={`/products?name=${keyword}`}
                onClick={() => setKeyword("")}
              >
                Tìm kiếm
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
