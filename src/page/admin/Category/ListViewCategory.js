import { faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
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
    console.log("delete ne id =>", id);

    const confirmDelete = window.confirm("Bạn chắc chắn xoá danh mục này?");
    if (confirmDelete == true) {
      const res = await AuthAPI().delete(`${endpoints.categories}/${id}`);
      console.log(res);
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

  console.log(categories);
  return (
    <>
      <div className="container-fluid mt-3">
        <h1 className="h3 mb-2 text-gray-800">Danh sách các danh mục</h1>
        {deleteSuccess ? (
          <>
            <div className="alert alert-success" role="alert">
              Xoá danh mục thành công
            </div>
          </>
        ) : null}

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Bảng dữ liệu danh mục
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th className="text-center">STT</th>
                    <th>Tên danh mục</th>
                    <th className="text-center">Số lượng sản phẩm</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category, index) => (
                    <tr key={category.id}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="align-middle">{category.name}</td>
                      <td className="text-center align-middle">
                        {category.productsCount}
                      </td>
                      <td>
                        <div className="d-flex flex-row justify-content-center">
                          <Link
                            className="btn btn-secondary mx-1"
                            to={`${routes.adminEditCategory}/${category.id}`}
                          >
                            <FontAwesomeIcon icon={faGear} />
                          </Link>
                          <button
                            type="button"
                            className="btn btn-secondary mx-1"
                            onClick={() => handleDelete(category.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
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
      </div>
    </>
  );
}
