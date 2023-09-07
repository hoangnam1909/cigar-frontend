import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";
import { routes } from "~/routers/routes";

export default function ListViewBrand() {
  const [dataImpact, setDataImpact] = useState(0);
  const [brands, setBrands] = useState();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
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
    async function getBrands() {
      await API()
        .get(endpoints.brands)
        .then((res) => {
          setBrands(res.data.result);
        });
    }

    getBrands();
  }, [dataImpact]);

  return (
    <>
      <div className="container-fluid mt-3">
        <h1 className="h3 mb-4 text-gray-800">Danh sách các thương hiệu</h1>
        {deleteSuccess ? (
          <>
            <div className="alert alert-success" role="alert">
              Xoá thương hiệu thành công
            </div>
          </>
        ) : null}

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
