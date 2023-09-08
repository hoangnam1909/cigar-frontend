import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";
import Pagination from "~/components/paginate/Pagination";
import { routes } from "~/routers/routes";

export default function ListViewCategory() {
  const [dataImpact, setDataImpact] = useState(0);
  const [categories, setcategories] = useState();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const PAGE_SIZE = 15;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn chắc chắn xoá danh mục này?");
    if (confirmDelete == true) {
      const res = await AuthAPI().delete(`${endpoints.categories}/${id}`);
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
      await API()
        .get(endpoints.categories)
        .then((res) => {
          setcategories(res.data.result);
        });
    }

    getCategories();
  }, [dataImpact]);

  return (
    <>
      <div className="container-fluid mt-3">
        <h3 className="mt-2 mb-4 text-gray-800">Danh sách danh mục</h3>
        {deleteSuccess ? (
          <>
            <div className="alert alert-success" role="alert">
              Xoá danh mục thành công
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
                  <th className="">STT</th>
                  <th>Tên danh mục</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category, index) => (
                  <tr key={category.id}>
                    <td className="align-middle fw-bolder">{category.id}</td>
                    <td className="align-middle">{category.name}</td>
                    {/* <td>
                      <div className="d-flex flex-row justify-content-center">
                        <Link
                          className="btn btn-secondary mx-1"
                          to={`${routes.adminEditCategory}/${category.id}`}
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </Link>
                        <button
                          type="button"
                          className="btn btn-secondary mx-1"
                          onClick={() => handleDelete(category.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td> */}
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
                                to={`${routes.adminEditCategory}/${category.id}`}
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
                                onClick={() => handleDelete(category.id)}
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
          <div>
            <nav className="mt-2" aria-label="Page navigation sample">
              <Pagination
                currentPage={categories?.number + 1}
                totalPages={categories?.totalPages}
              />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
