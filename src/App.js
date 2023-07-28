import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import { Route, Routes } from "react-router-dom";
import Header from "./layout/component/Header";
import { Container } from "react-bootstrap";
import Footer from "./layout/component/Footer";
import ScrollTop from "./utils/ScrollTop";
import LandingPage from "./page/admin/LandingPage";
import EditProduct from "./page/admin/product/EditProduct";
import ProductDetail from "./layout/component/product/ProductDetail";
import Home from "./page/client/Home";
import Products from "./page/client/Products";
import Contact from "./page/Contact";
import IconScrollTop from "./layout/component/IconScrollTop";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <div style={{ height: "56px" }}></div>
      <Container className="px-3">
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/admin" element={<LandingPage />} />
          <Route path="/admin/product" element={<EditProduct />} /> */}
        </Routes>
      </Container>
      <Footer />
      <IconScrollTop />
    </>
  );
}
