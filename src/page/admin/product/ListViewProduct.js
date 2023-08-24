import { faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";
import Pagination from "~/components/paginate/Pagination";
import { routes } from "~/routers/routes";

export default function ListViewProduct() {
  const [dataImpact, setDataImpact] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [productsRes, setProductsRes] = useState();
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  let location = useLocation();
  const PAGE_SIZE = 15;

  const handleDelete = async (id) => {
    console.log("delete ne id =>", id);

    const confirmDelete = window.confirm("Bạn chắc chắn xoá sản phẩm này?");
    if (confirmDelete == true) {
      const res = await AuthAPI().delete(`${endpoints.products}/${id}`);
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
    const params = queryString.parse(location.search);

    async function getProducts() {
      setLoading(true);
      await API()
        .get(endpoints.products, {
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
        <h1 className="h3 mb-4 text-gray-800">Danh sách tất cả sản phẩm</h1>
        {deleteSuccess ? (
          <>
            <div className="alert alert-success" role="alert">
              Xoá sản phẩm thành công
            </div>
          </>
        ) : null}

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Bảng dữ liệu sản phẩm
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
                    <th>Tên sản phẩm</th>
                    <th>Danh mục</th>
                    <th>Thương hiệu</th>
                  </tr>
                </thead>
                <tbody>
                  {productsRes?.content.map((p, index) => (
                    <tr key={p.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{p.name}</td>
                      <td>{p.category.name}</td>
                      <td>{p.brand.name}</td>
                      <td>
                        <div className="d-flex flex-row justify-content-center">
                          <Link
                            className="btn btn-secondary mx-1"
                            to={`${routes.adminEditProduct}/${p.id}`}
                          >
                            <FontAwesomeIcon icon={faGear} />
                          </Link>
                          <button
                            type="button"
                            className="btn btn-secondary mx-1"
                            onClick={() => handleDelete(p.id)}
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
                  currentPage={productsRes?.number + 1}
                  totalPages={productsRes?.totalPages}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
