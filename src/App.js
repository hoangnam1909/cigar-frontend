import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "./layout/component/Header";
import { Container } from "react-bootstrap";
import Footer from "./layout/component/Footer";
import ScrollTop from "./utils/ScrollTop";
import ProductDetail from "./page/client/product/ProductDetail";
import Products from "./page/client/product/Products";
import Contact from "./page/client/contact/Contact";
import NotFound404 from "./page/error/NotFound404";
import AuthPage from "./page/auth/AuthPage";
import IconScrollTop from "./components/scroll-to-top/IconScrollTop";
import SideBar from "./components/side-bar/SideBar";
import AdminDashboard from "./page/admin/AdminDashboard";
import JWT from "./page/admin/JWT";
import { tokenUserRole, verifyToken } from "./service/AuthService";
import ListViewProduct from "./page/admin/product/ListViewProduct";
import AddProduct from "./page/admin/product/AddProduct";
import EditProduct from "./page/admin/product/EditProduct";
import { routes } from "./routers/routes";
import ListViewCategory from "./page/admin/category/ListViewCategory";
import AddCategory from "./page/admin/category/AddCategory";
import EditCategory from "./page/admin/category/EditCategory";
import ListViewBrand from "./page/admin/brand/ListViewBrand";
import AddBrand from "./page/admin/brand/AddBrand";
import EditBrand from "./page/admin/brand/EditBrand";
import Cart from "./page/client/cart/Cart";
import Home from "./page/client/home/Home";
import ListViewOrder from "./page/admin/order/ListViewOrder";
import AdminOrderDetail from "./page/admin/order/AdminOrderDetail";
import TrackingOrder from "./page/client/track-order/TrackingOrder";

export default function BaseLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname.startsWith("/admin")) {
    if (verifyToken() && tokenUserRole() === "ADMIN") {
      return (
        <>
          <ScrollTop />
          <div className="d-flex">
            <div className="side-bar p-3 bg-white" s>
              <SideBar />
            </div>
            <div
              className="content d-flex flex-column vh-100"
              style={{ backgroundColor: "#f5f7fa" }}
            >
              <Routes>
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Product routes */}
                <Route
                  path={routes.adminProducts}
                  element={<ListViewProduct />}
                />
                <Route path={routes.adminAddProduct} element={<AddProduct />} />
                <Route
                  path={`${routes.adminEditProduct}/:productId`}
                  element={<EditProduct />}
                />

                {/* Category routes */}
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

                {/* Brand routes */}
                <Route path={routes.adminBrands} element={<ListViewBrand />} />
                <Route path={routes.adminAddBrand} element={<AddBrand />} />
                <Route
                  path={`${routes.adminEditBrand}/:brandId`}
                  element={<EditBrand />}
                />

                {/* Product routes */}
                <Route path={routes.adminOrders} element={<ListViewOrder />} />
                <Route
                  path={`${routes.adminEditOrder}/:orderId`}
                  element={<AdminOrderDetail />}
                />

                <Route path="/jwt" element={<JWT />} />
                <Route path="/*" element={<NotFound404 />} />
              </Routes>
            </div>
          </div>
        </>
      );
    } else {
      return <AuthPage />;
    }
  }

  if (location.pathname === "/auth") {
    if (!verifyToken()) {
      return <AuthPage />;
    }
  }

  return (
    <>
      <Header />
      <ScrollTop />
      <Container className="px-auto" style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:productRewriteUrl"
            element={<ProductDetail />}
          />
          {/* <Route path="/products/skeleton" element={<ProductCardSkeleton />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/tracking-order" element={<TrackingOrder />} />
          <Route path="/*" element={<NotFound404 />} />
        </Routes>
      </Container>
      <Footer />
      <IconScrollTop />
    </>
  );
}
