import { useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { adminEndpoints } from "~/api/API";
import Pagination from "~/components/paginate/Pagination";
import { routes } from "~/routers/routes";
import moment from "moment";
import "moment/locale/vi";
import queryString from "query-string";
import AuthAPI from "~/api/AuthAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faEllipsis,
  faFilterCircleXmark,
  faMagnifyingGlass,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import ButtonDropdownFilter from "~/components/button/ButtonDropdownFilter";
import { toVND } from "~/utils/currency";
import orderSortData from "~/data/orderSortValue.json";

export default function ListViewOrder() {
  const [ordersRes, setOrdersRes] = useState();
  const [orderStatuses, setOrderStatuses] = useState();
  const [deliveryCompanies, setDeliveryCompanies] = useState();
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
    const getDeliveryCompanies = async () => {
      const res = await AuthAPI().get(adminEndpoints.deliveryCompanies);
      if (res.status === 200) setDeliveryCompanies(res.data.result);
    };

    getDeliveryCompanies();
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
        setOrdersRes(res.data.result);
      }
    };

    getOrders();
  }, [searchParams]);

  console.log(orderSortData);

  return (
    <>
      <div className="container-fluid mt-3">
        <h3 className="mt-2 mb-4 text-gray-800">Danh sách đơn hàng</h3>

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
                objectList={orderSortData}
                filterName={"Sắp xếp"}
                filterKey={"sort"}
                valueField={"value"}
              />
            </div>

            <div className="filter-dropdown">
              <ButtonDropdownFilter
                objectList={orderStatuses}
                filterName={"Tình trạng"}
                filterKey={"orderStatusId"}
                valueField={"id"}
              />
            </div>

            <div className="filter-dropdown">
              <ButtonDropdownFilter
                objectList={deliveryCompanies}
                filterName={"Đơn vị vận chuyển"}
                filterKey={"deliveryCompanyId"}
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
                    to={""}
                  >
                    <FontAwesomeIcon icon={faPlus} className="me-2" />
                    Action...
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="d-flex justify-content-end mt-3 mb-1 px-4">
            <Pagination
              currentPage={ordersRes?.number + 1}
              totalPages={ordersRes?.totalPages}
            />
          </div>

          <div className="px-4 py-0">
            <table className="table table-hover" width="100%" cellSpacing="0">
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
                {ordersRes?.content?.map((order) => (
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
                      {moment(order.createdAt).format("LT")}
                      {" - "}
                      {moment(order.createdAt).format("ll")}
                    </td>
                    <td className="align-middle">{order.orderStatus.name}</td>
                    <td className="align-middle">
                      {order.shipment?.deliveryCompany?.name}
                    </td>
                    <td
                      className="align-middle"
                      onClick={() => {
                        if (order.shipment?.trackingNumber) {
                          navigator.clipboard.writeText(
                            order.shipment?.trackingNumber
                          );
                          alert("Đã sao chép mã vận đơn");
                        }
                      }}
                    >
                      {order.shipment?.trackingNumber ? (
                        <>
                          <FontAwesomeIcon icon={faCopy} className="me-2" />
                          {order.shipment?.trackingNumber}
                        </>
                      ) : null}
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
        </div>
      </div>
    </>
  );
}
