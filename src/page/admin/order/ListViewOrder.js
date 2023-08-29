import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import API, { endpoints } from "~/api/API";
import Pagination from "~/components/paginate/Pagination";
import { routes } from "~/routers/routes";
import moment from "moment";
import "moment/locale/vi";
import queryString from "query-string";

export default function ListViewOrder() {
  const [orders, setOrders] = useState();
  const navigate = useNavigate();
  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const PAGE_SIZE = 10;

  useEffect(() => {
    const params = queryString.parse(location.search);

    const getOrders = async () => {
      const res = await API().get(endpoints.order, {
        params: {
          ...params,
          page: searchParams.get("page")
            ? parseInt(searchParams.get("page"))
            : 1,
          size: PAGE_SIZE,
        },
      });
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
                className="table table-bordered table-hover"
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
                  {orders?.content?.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => {
                        navigate(`${routes.adminOrders}/${order.id}`);
                      }}
                      style={{ cursor: "pointer" }}
                    >
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
                      <td>{order.orderStatus.name}</td>
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
