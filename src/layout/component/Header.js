import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import API, { endpoints } from "~/config/API";

export default function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      await API.get(endpoints.categories).then((res) => {
        setCategories(res.data.result);
      });
    }
    fetchCategories();
  }, []);

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
          <Navbar.Brand as={Link} to="/">
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
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Trang chủ
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Sản phẩm
              </Nav.Link>
              <Nav.Link as={Link} to="/about-us">
                Giới thiệu
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Liên hệ
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/admin/product">
                ProductAdmin
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
