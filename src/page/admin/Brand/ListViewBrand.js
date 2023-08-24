import { faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
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
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Bảng dữ liệu thương hiệu
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
                    <th>Tên thương hiệu</th>
                    <th>Quốc gia</th>
                  </tr>
                </thead>
                <tbody>
                  {brands?.map((brand, index) => (
                    <tr key={brand.id}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="align-middle">{brand.name}</td>
                      <td className="align-middle">{brand.country}</td>
                      <td>
                        <div className="d-flex flex-row justify-content-center">
                          <Link
                            className="btn btn-secondary mx-1"
                            to={`${routes.adminEditBrand}/${brand.id}`}
                          >
                            <FontAwesomeIcon icon={faGear} />
                          </Link>
                          <button
                            type="button"
                            className="btn btn-secondary mx-1"
                            onClick={() => handleDelete(brand.id)}
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
      </div>
    </>
  );
}
