import { Route, Routes } from "react-router-dom";
import Header from "./layout/component/Header";
import Home from "~/page/Home";
import Products from "~/page/Products";
import { Container } from "react-bootstrap";
import ProductDetail from "./layout/product/ProductDetail";
import EditProduct from "./layout/product/EditProduct";
import Footer from "./layout/component/Footer";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <div style={{ height: "56px" }}></div>
      <Container className="px-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/product" element={<EditProduct />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}
