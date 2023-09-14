import {
  faEllipsis,
  faFilterCircleXmark,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import API, { adminEndpoints, endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";
import { routes } from "~/routers/routes";

export default function BrandListView() {
  const [dataImpact, setDataImpact] = useState(0);
  const [brands, setBrands] = useState();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState();
  let location = useLocation();
  const PAGE_SIZE = 15;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn xoá thương hiệu này?");
    if (confirmDelete == true) {
      const res = await AuthAPI().delete(`${endpoints.brands}/${id}`);
      if (res.status === 200) {
        setDeleteSuccess(true);
        setDataImpact((dataImpact) => {
          return dataImpact + 1;
        });
      }
    }
  };

  useEffect(() => {
    const params = queryString.parse(location.search);

    const getBrands = async () => {
      const res = await AuthAPI().get(adminEndpoints.brands, {
        params: {
          ...params,
        },
      });

      if (res.status === 200) setBrands(res.data.result);
    };

    getBrands();
  }, [dataImpact, searchParams]);

  return (
    <>
      <div className="container-fluid mt-3">
        <h3 className="mt-2 mb-4 text-gray-800">Danh sách thương hiệu</h3>
        {deleteSuccess ? (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            Xoá thương hiệu thành công
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
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
                  placeholder="Tìm kiếm thương hiệu"
                  value={keyword}
                  onChange={(e) => {
                    setKeyword(e.target.value);
                    setTimeout(() => {
                      searchParams.delete("page");
                      if (e.target.value.length == 0) {
                        searchParams.delete("kw");
                        setSearchParams(searchParams);
                      } else {
                        searchParams.set("kw", `${e.target.value}`);
                        setSearchParams(searchParams);
                      }
                    }, 800);
                  }}
                />
              </div>
            </div>

            <div className="filter-dropdown">
              <a
                type="button"
                className="btn btn-danger px-5"
                onClick={(e) => {
                  e.preventDefault();
                  setSearchParams();
                  setKeyword("");
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
                    to={routes.adminAddBrand}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Thêm thương hiệu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="table-responsive rounded p-4">
            <table
              className="table table-hover"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th className="">ID</th>
                  <th>Tên thương hiệu</th>
                  <th>Quốc gia</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {brands?.map((brand, index) => (
                  <tr key={brand.id}>
                    <td className="align-middle fw-bolder">#{brand.id}</td>
                    <td className="align-middle">{brand.name}</td>
                    <td className="align-middle">{brand.country}</td>
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
                                to={`${routes.adminEditBrand}/${brand.id}`}
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
                                onClick={() => handleDelete(brand.id)}
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
          {/* <div>
              <nav className="mt-2" aria-label="Page navigation sample">
                <Pagination
                  currentPage={categories?.number + 1}
                  totalPages={categories?.totalPages}
                />
              </nav>
            </div> */}
        </div>
      </div>
    </>
  );
}
