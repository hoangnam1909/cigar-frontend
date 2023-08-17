import "./SideBar.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { routes } from "~/routers/routes";
import { useEffect, useState } from "react";
import API, { endpoints } from "~/api/API";

export default function SideBar() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      const response = await API().get(
        `${endpoints.currentUser}/${Cookies.get("accessToken")}`
      );
      console.log(response);
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
        {/* <li className="mb-1">
          <a
            className={`${styles.btn} d-inline-flex align-items-center rounded border-0`}
            href="/"
          >
            Home
          </a>
        </li> */}
        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0"
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
                  to="/admin/categories"
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Xem danh sách
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categories/add"
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Thêm danh mục mới
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
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
                  to={routes.adminBrands}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Xem danh sách
                </Link>
              </li>
              <li>
                <Link
                  to={routes.adminAddBrand}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Thêm thương hiệu mới
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
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
                  to={routes.adminProducts}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Xem danh sách
                </Link>
              </li>
              <li>
                <Link
                  to={routes.adminAddProduct}
                  className="link-body-emphasis d-inline-flex text-decoration-none rounded"
                >
                  Thêm sản phẩm mới
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="border-top my-3"></li>

        <li className="mb-1">
          <button
            className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
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
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    Cookies.remove("accessToken");
                    Cookies.remove("rememberMe");
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
