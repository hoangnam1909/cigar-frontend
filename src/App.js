import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./layout/component/Header";
import { Container } from "react-bootstrap";
import Footer from "./layout/component/Footer";
import ScrollTop from "./utils/ScrollTop";
import ProductDetail from "./layout/component/product/ProductDetail";
import Home from "./page/Home/Home";
import Products from "./page/Client/Product/Products";
import Contact from "./page/Client/Contact";
import NotFound404 from "./page/error/NotFound404";
import AuthPage from "./page/Auth/AuthPage";
import IconScrollTop from "./components/ScrollToTop/IconScrollTop";
import SideBar from "./components/SideBar/SideBar";
import AdminDashboard from "./page/Admin/AdminDashboard";
import JWT from "./page/Admin/JWT";
import { tokenUserRole, verifyToken } from "./service/AuthService";
import ListViewProduct from "./page/Admin/Product/ListViewProduct";
import AddProduct from "./page/Admin/Product/AddProduct";
import EditProduct from "./page/Admin/Product/EditProduct";
import { routes } from "./routers/routes";
import ListViewCategory from "./page/Admin/Category/ListViewCategory";
import AddCategory from "./page/Admin/Category/AddCategory";
import EditCategory from "./page/Admin/Category/EditCategory";
import ListViewBrand from "./page/Admin/Brand/ListViewBrand";
import AddBrand from "./page/Admin/Brand/AddBrand";
import EditBrand from "./page/Admin/Brand/EditBrand";

export default function BaseLayout() {
  const location = useLocation();

  if (location.pathname === "/auth") {
    if (!verifyToken()) {
      return (
        <>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        </>
      );
    }
  }

  console.log(
    "condition",
    location.pathname.startsWith("/admin") &&
      verifyToken() &&
      tokenUserRole() === "ADMIN"
  );

  if (location.pathname.startsWith("/admin")) {
    if (verifyToken() && tokenUserRole() === "ADMIN") {
      console.log("admin route");
      return (
        <>
          <div className="d-flex">
            <div className="side-bar p-3 bg-white" s>
              <SideBar />
            </div>
            <div className="content d-flex flex-column px-3">
              <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route
                  path={routes.adminProducts}
                  element={<ListViewProduct />}
                />
                <Route path={routes.adminAddProduct} element={<AddProduct />} />
                <Route
                  path={`${routes.adminEditProduct}/:productId`}
                  element={<EditProduct />}
                />

                <Route
                  path={routes.adminCategories}
                  element={<ListViewCategory />}
                />
                <Route
                  path={routes.adminAddCategory}
                  element={<AddCategory />}
                />
                <Route
                  path={`${routes.adminEditCategory}/:categoryId`}
                  element={<EditCategory />}
                />

                <Route path={routes.adminBrands} element={<ListViewBrand />} />
                <Route path={routes.adminAddBrand} element={<AddBrand />} />
                <Route
                  path={`${routes.adminEditBrand}/:brandId`}
                  element={<EditBrand />}
                />

                <Route path="/jwt" element={<JWT />} />
                <Route path="/*" element={<NotFound404 />} />
              </Routes>
            </div>
          </div>
        </>
      );
    } else {
      window.location = "/auth";
    }
  }

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
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </Container>
      <Footer />
      <IconScrollTop />
    </>
  );
}
