import "bootstrap/dist/css/bootstrap.min.css";
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
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              alt="brand-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Icons8_flat_shop.svg/1200px-Icons8_flat_shop.svg.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Nam Sờ Mốk
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Trang chủ
              </Nav.Link>
              <Nav.Link as={Link} to="/new-arrival">
                Hàng mới về
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
              <Nav.Link href="#">Register</Nav.Link>
              <Nav.Link href="#">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
