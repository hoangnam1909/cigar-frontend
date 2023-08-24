import { faEye, faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import Pagination from "~/components/paginate/Pagination";
import { routes } from "~/routers/routes";
import moment from "moment";
import "moment/locale/vi";

export default function ListViewOrder() {
  const [orders, setOrders] = useState();

  const handleDelete = async (id) => {
    // const confirmDelete = window.confirm("Bạn chắc chắn xoá sản phẩm này?");
    // if (confirmDelete == true) {
    //   const res = await AuthAPI().delete(`${endpoints.products}/${id}`);
    //   console.log(res);
    //   if (res.status === 200) {
    //     setDeleteSuccess(true);
    //     setDataImpact((dataImpact) => {
    //       return dataImpact + 1;
    //     });
    //   }
    // }
  };

  useEffect(() => {
    const getOrders = async () => {
      const res = await API().get(endpoints.order);
      if (res.status === 200) {
        setOrders(res.data.result);
      }
    };

    getOrders();
  }, []);

  return (
    <>
      <div className="container-fluid mt-3">
        <h1 className="h3 mb-4 text-gray-800">Danh sách đơn hàng</h1>

        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Bảng dữ liệu đơn hàng
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
                    <th className="text-center">Order ID</th>
                    <th>Khách hàng</th>
                    <th>Ngày đặt</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.content.map((order) => (
                    <tr key={order.id}>
                      <td className="text-center fw-bolder">
                        <Link to={`${routes.adminOrders}/${order.id}`}>
                          #{order.id}
                        </Link>
                      </td>
                      <td>{order.customer.fullName}</td>
                      <td>
                        {moment(order.createdAt).format("LTS")}
                        {" - "}
                        {moment(order.createdAt).format("LL")}
                      </td>
                      <td>Chờ duyệt</td>
                      <td>
                        <div className="d-flex flex-row justify-content-center">
                          <Link
                            className="btn btn-secondary mx-1"
                            to={`${routes.adminOrders}/${order.id}`}
                          >
                            <FontAwesomeIcon icon={faEye} />
                          </Link>
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
                  currentPage={orders?.number + 1}
                  totalPages={orders?.totalPages}
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
