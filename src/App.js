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
import ProductListView from "./page/admin/product/ProductListView";
import ProductAdd from "./page/admin/product/ProductAdd";
import ProductEdit from "./page/admin/product/ProductEdit";
import { routes } from "./routers/routes";
import CategoryListView from "./page/admin/category/CategoryListView";
import CategoryAdd from "./page/admin/category/CategoryAdd";
import CategoryEdit from "./page/admin/category/CategoryEdit";
import BrandListView from "./page/admin/brand/BrandListView";
import BrandAdd from "./page/admin/brand/BrandAdd";
import BrandEdit from "./page/admin/brand/BrandEdit";
import Cart from "./page/client/cart/Cart";
import Home from "./page/client/home/Home";
import OrderDetailInfo from "./page/admin/order/OrderDetailInfo";
import TrackingOrder from "./page/client/track-order/TrackingOrder";
import OrderListView from "./page/admin/order/OrderListView";

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
                  element={<ProductListView />}
                />
                <Route path={routes.adminAddProduct} element={<ProductAdd />} />
                <Route
                  path={`${routes.adminEditProduct}/:productId`}
                  element={<ProductEdit />}
                />

                {/* Category routes */}
                <Route
                  path={routes.adminCategories}
                  element={<CategoryListView />}
                />
                <Route
                  path={routes.adminAddCategory}
                  element={<CategoryAdd />}
                />
                <Route
                  path={`${routes.adminEditCategory}/:categoryId`}
                  element={<CategoryEdit />}
                />

                {/* Brand routes */}
                <Route path={routes.adminBrands} element={<BrandListView />} />
                <Route path={routes.adminAddBrand} element={<BrandAdd />} />
                <Route
                  path={`${routes.adminEditBrand}/:brandId`}
                  element={<BrandEdit />}
                />

                {/* Product routes */}
                <Route path={routes.adminOrders} element={<OrderListView />} />
                <Route
                  path={`${routes.adminEditOrder}/:orderId`}
                  element={<OrderDetailInfo />}
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
      <Container className="px-0" style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route
            path="/products/:productRewriteUrl"
            element={<ProductDetail />}
          />
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
