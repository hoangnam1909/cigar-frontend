import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import API, { adminEndpoints, endpoints } from "~/api/API";
import Pagination from "~/components/paginate/Pagination";
import { routes } from "~/routers/routes";
import moment from "moment";
import "moment/locale/vi";
import queryString from "query-string";
import AuthAPI from "~/api/AuthAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faFilterCircleXmark,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ButtonDropdownFilter from "~/components/button/ButtonDropdownFilter";
import { toVND } from "~/utils/currency";

export default function ListViewOrder() {
  const [orders, setOrders] = useState();
  const [orderStatuses, setOrderStatuses] = useState();
  const navigate = useNavigate();
  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const PAGE_SIZE = 10;

  useEffect(() => {
    const getOrderStatuses = async () => {
      const res = await AuthAPI().get(adminEndpoints.orderStatuses);
      if (res.status === 200) setOrderStatuses(res.data.result);
    };

    getOrderStatuses();
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);

    const getOrders = async () => {
      const res = await AuthAPI().get(adminEndpoints.orders, {
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
  }, [searchParams]);

  return (
    <>
      <div className="container-fluid mt-3">
        <h1 className="h3 mt-2 mb-4 text-gray-800">Danh sách đơn hàng</h1>

        <div className="mb-4">
          <div className="d-flex flex-wrap gap-3">
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
              <div
                className="btn-group"
                role="group"
                aria-label="Button group with nested dropdown"
              >
                <ButtonDropdownFilter
                  objectList={orderStatuses}
                  filterName={"Tình trạng"}
                  filterKey={"orderStatusId"}
                />

                <a
                  type="button"
                  className="btn btn-light px-5"
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchParams();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFilterCircleXmark}
                    className="me-2"
                  />
                  Loại bỏ bộ lọc
                </a>
              </div>
            </div>

            {/* <div className="">
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
            </div> */}
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="table-responsive rounded p-4 pb-0">
            <table
              className="table table-hover"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th style={{ width: "5%" }} className="">
                    ID
                  </th>
                  <th style={{ width: "10%" }} className="text-end">
                    Tổng tiền
                  </th>
                  <th style={{ width: "20%" }} className="ps-5">
                    Khách hàng
                  </th>
                  <th style={{ width: "20%" }}>Ngày đặt hàng</th>
                  <th style={{ width: "15%" }}>Trạng thái</th>
                  <th style={{ width: "15%" }}>Đối tác giao hàng</th>
                  <th style={{ width: "10%" }}>Mã vận đơn</th>
                  <th style={{ width: "5%" }}></th>
                </tr>
              </thead>
              <tbody>
                {orders?.content?.map((order) => (
                  <tr
                    key={order.id}
                    onDoubleClick={() => {
                      navigate(`${routes.adminEditOrder}/${order.id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="fw-bolder py-3">
                      <Link
                        to={`${routes.adminEditOrder}/${order.id}`}
                        className="d-block"
                      >
                        #{order.id}
                      </Link>
                    </td>
                    <td className="align-middle text-end">
                      {toVND(order.totalPrice)}
                    </td>
                    <td className="align-middle ps-5">
                      {order.customer.fullName}
                    </td>
                    <td className="align-middle">
                      {moment(order.createdAt).format("LTS")}
                      {" - "}
                      {moment(order.createdAt).format("LL")}
                    </td>
                    <td className="align-middle">{order.orderStatus.name}</td>
                    <td className="align-middle">
                      {order.shipment?.deliveryCompany?.name}
                    </td>
                    <td className="align-middle">
                      {order.shipment?.trackingNumber}
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
                                to={`${routes.adminEditOrder}/${order.id}`}
                              >
                                Sửa
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
            <nav className="mb-3" aria-label="Page navigation sample">
              <Pagination
                currentPage={orders?.number + 1}
                totalPages={orders?.totalPages}
              />
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
