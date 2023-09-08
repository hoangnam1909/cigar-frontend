import {
  faEllipsis,
  faFilterCircleXmark,
  faMagnifyingGlass,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import API, { adminEndpoints, endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";
import ButtonDropdownFilter from "~/components/button/ButtonDropdownFilter";
import Pagination from "~/components/paginate/Pagination";
import { routes } from "~/routers/routes";
import moment from "moment";
import "moment/locale/vi";

export default function ListViewProduct() {
  const [dataImpact, setDataImpact] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [productsRes, setProductsRes] = useState();
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  let location = useLocation();
  const PAGE_SIZE = 15;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn xoá sản phẩm này?");
    if (confirmDelete == true) {
      const res = await AuthAPI().delete(`${adminEndpoints.products}/${id}`);
      if (res.status === 200) {
        setDeleteSuccess(true);
        setDataImpact((dataImpact) => {
          return dataImpact + 1;
        });
      }
    }
  };

  useEffect(() => {
    async function getCategories() {
      const res = await API().get(endpoints.categories);
      const data = res.data.result;
      setCategories(data);
    }

    getCategories();
  }, []);

  useEffect(() => {
    async function getBrands() {
      const res = await API().get(endpoints.brands);
      setBrands(res.data.result);
    }

    getBrands();
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);

    async function getProducts() {
      setLoading(true);
      await AuthAPI()
        .get(adminEndpoints.products, {
          params: {
            ...params,
            page: searchParams.get("page")
              ? parseInt(searchParams.get("page"))
              : 1,
            size: PAGE_SIZE,
          },
        })
        .then((res) => {
          setProductsRes(res.data.result);
          setLoading(false);
        });
    }

    getProducts();
  }, [searchParams, dataImpact]);

  return (
    <>
      <div className="container-fluid mt-3">
        <h3 className="mt-2 mb-4 text-gray-800">Danh sách sản phẩm</h3>
        {deleteSuccess ? (
          <>
            <div className="alert alert-success" role="alert">
              Xoá sản phẩm thành công
            </div>
          </>
        ) : null}

        <div className="mb-4">
          <div className="d-flex flex-wrap gap-2">
            <div
              className="search-box border rounded"
              style={{ width: "370px" }}
            >
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text bg-white border-0"
                  id="addon-wrapping"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                  type="text"
                  className="form-control border-0 outline-none"
                  placeholder="Tìm kiếm tên sản phẩm"
                  onChange={(e) => {
                    setTimeout(function () {
                      searchParams.delete("page");
                      if (e.target.value.length == 0) {
                        searchParams.delete("name");
                        setSearchParams(searchParams);
                      } else {
                        searchParams.set("name", `${e.target.value}`);
                        setSearchParams(searchParams);
                      }
                    }, 500);
                  }}
                />
              </div>
            </div>

            <div className="filter-dropdown">
              <ButtonDropdownFilter
                objectList={categories}
                filterName={"Danh mục"}
                filterKey={"categoryId"}
                valueField={"id"}
              />
            </div>

            <div className="filter-dropdown">
              <ButtonDropdownFilter
                objectList={brands}
                filterName={"Thương hiệu"}
                filterKey={"brandId"}
                valueField={"id"}
              />
            </div>

            <div className="filter-dropdown">
              <a
                type="button"
                className="btn btn-light px-5"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchParams();
                }}
              >
                <FontAwesomeIcon icon={faFilterCircleXmark} className="me-2" />
                Loại bỏ bộ lọc
              </a>
            </div>

            <div className="">
              <div className="btn-group">
                <div className="btn-group" role="group">
                  <Link
                    className="btn btn-primary"
                    style={{ width: "180px" }}
                    to={routes.adminAddProduct}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Thêm sản phẩm
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="d-flex justify-content-end mt-3 mb-1 px-4">
            <Pagination
              currentPage={productsRes?.number + 1}
              totalPages={productsRes?.totalPages}
            />
          </div>
          <div className="table-responsive rounded px-4 py-0">
            <table
              className="table table-hover"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th
                    className="align-self-center"
                    // style={{ width: "80px" }}
                    style={{ width: "5%" }}
                  ></th>
                  <th className="align-self-center" style={{ width: "5%" }}>
                    ID
                  </th>
                  <th className="align-self-center" style={{ width: "" }}>
                    Tên sản phẩm
                  </th>
                  <th className="align-self-center" style={{ width: "15%" }}>
                    Danh mục
                  </th>
                  <th className="align-self-center" style={{ width: "15%" }}>
                    Thương hiệu
                  </th>
                  <th className="align-self-center" style={{ width: "15%" }}>
                    Ngày tạo
                  </th>
                  <th
                    className="align-self-center"
                    style={{ width: "10%" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {productsRes?.content.map((p, index) => (
                  <tr key={p.id}>
                    <td className="align-middle">
                      <Link to={`${routes.adminEditProduct}/${p.id}`}>
                        <img
                          src={p.productImages[0]?.linkToImage}
                          width={53}
                          height={53}
                          className="object-fit-cover rounded"
                        />
                      </Link>
                    </td>
                    <td className="align-middle fw-bolder">#{p.id}</td>
                    <td className="align-middle">
                      <Link
                        to={`${routes.adminEditProduct}/${p.id}`}
                        className="text-primary"
                      >
                        {p.name}
                      </Link>
                    </td>
                    <td className="align-middle">{p.category.name}</td>
                    <td className="align-middle">{p.brand.name}</td>
                    <td className="align-middle">
                      {moment(p.createdDate).format("LT")}
                      {" - "}
                      {moment(p.createdDate).format("ll")}
                    </td>
                    <td className="align-middle">
                      <div className="d-flex flex-row justify-content-center">
                        <div className="btn-group">
                          <a
                            className="btn rounded border-0"
                            style={{ cursor: "pointer" }}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FontAwesomeIcon icon={faEllipsis} />
                          </a>
                          <ul className="dropdown-menu">
                            <li>
                              <Link
                                className="dropdown-item"
                                to={`${routes.adminEditProduct}/${p.id}`}
                              >
                                Sửa
                              </Link>
                            </li>
                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <Link
                                className="dropdown-item text-danger"
                                onClick={() => handleDelete(p.id)}
                              >
                                Xoá
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
