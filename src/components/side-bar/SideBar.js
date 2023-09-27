import "./SideBar.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { routes } from "~/routers/routes";
import { useEffect, useState } from "react";
import API, { endpoints } from "~/api/API";
import { removeAuthInfo } from "~/service/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function SideBar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      const response = await API().get(
        `${endpoints.currentUser}/${Cookies.get("accessToken")}`
      );
      setUser(response.data.result);
    }

    getCurrentUser();
  }, []);

  return (
    <>
      <div className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
        <Link to="/admin">
          <img
            src="https://res.cloudinary.com/nhn1909/image/upload/v1690041731/ktypjs6ap3ykjv6eydqu.png"
            alt="Bootstrap"
            width="50"
            className="me-1"
          />
          <span className="fs-5 fw-semibold">Dashboard</span>
        </Link>
      </div>
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 w-100"
            data-bs-toggle="collapse"
            data-bs-target="#category-collapse"
            aria-expanded="true"
          >
            Danh mục
          </button>
          <div className="collapse show" id="category-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link
                  to="/admin/categories/add"
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Thêm danh mục mới
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categories"
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Các danh mục
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100"
            data-bs-toggle="collapse"
            data-bs-target="#brands-collapse"
            aria-expanded="true"
          >
            Thương hiệu
          </button>
          <div className="collapse show" id="brands-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link
                  to={routes.adminAddBrand}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Thêm thương hiệu mới
                </Link>
              </li>
              <li>
                <Link
                  to={routes.adminBrands}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Các thương hiệu
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100"
            data-bs-toggle="collapse"
            data-bs-target="#products-collapse"
            aria-expanded="true"
          >
            Sản phẩm
          </button>
          <div className="collapse show" id="products-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link
                  to={routes.adminAddProduct}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Thêm sản phẩm mới
                </Link>
              </li>
              <li>
                <Link
                  to={routes.adminProducts}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Các sản phẩm
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100"
            data-bs-toggle="collapse"
            data-bs-target="#orders-collapse"
            aria-expanded="true"
          >
            Đơn hàng
          </button>
          <div className="collapse show" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link
                  to={routes.adminOrders}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Các đơn hàng
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="border-top my-3"></li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed w-100"
            data-bs-toggle="collapse"
            data-bs-target="#account-collapse"
            aria-expanded="true"
          >
            {user?.username}
          </button>
          <div className="collapse show" id="account-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a
                  href="#"
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Thông tin cá nhân
                </a>
              </li>
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    removeAuthInfo();
                    navigate("/auth");
                  }}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </>
  );
}
