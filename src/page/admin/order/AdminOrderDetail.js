import {
  faLocationDot,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import moment from "moment";
import "moment/locale/vi";
import { toVND } from "~/utils/currency";
import AuthAPI from "~/api/AuthAPI";

export default function AdminOrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const [orderStatusId, setOrderStatusId] = useState();
  const [orderStatuses, setOrderStatuses] = useState();
  const [orderStatusSpinner, setOrderStatusSpinner] = useState(false);

  const getOrder = async () => {
    const res = await AuthAPI().get(`${endpoints.order}/${orderId}`);
    if (res.status === 200) setOrder(res.data.result);
  };

  const getOrderStatuses = async () => {
    const res = await API().get(endpoints.orderStatus);
    if (res.data.result != null) {
      setOrderStatuses(res.data.result);
    }
  };

  useEffect(() => {
    getOrder();
    getOrderStatuses();
  }, []);

  const updateOrderStatus = async (e) => {
    setOrderStatusSpinner(true);

    const res = await AuthAPI().patch(`${endpoints.order}/${orderId}`, {
      orderStatusId: e.target.value,
    });
    console.log(res);
    if (res.status === 200) getOrder();

    setOrderStatusSpinner(false);
  };

  if (order) {
    return (
      <>
        <div className="container-fluid mt-3">
          <h1 className="h3 mb-4 text-gray-800">
            Chi tiết đơn hàng #{orderId}
          </h1>

          <div className="card shadow px-5 py-4 mb-4">
            <div className="row mb-4 d-flex justify-content-between border-bottom">
              <div className="col">
                <h6 className="mb-1">
                  {moment(order.createdAt).format("LTS")}
                  {" - "}
                  {moment(order.createdAt).format("LL")}
                </h6>
                <p>{`#ID ${order.id}`}</p>
              </div>
              <div className="col">
                <div className="d-flex justify-content-end">
                  {orderStatusSpinner ? (
                    <div
                      className="spinner-border me-3 align-self-center"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : null}

                  <select
                    className="form-select"
                    disabled={orderStatusSpinner}
                    defaultValue={order?.orderStatus.id}
                    style={{ width: "190px" }}
                    onChange={(e) => {
                      updateOrderStatus(e);
                    }}
                  >
                    {orderStatuses?.map((orderStatus) => {
                      return (
                        <option value={orderStatus.id}>
                          {orderStatus.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            <div className="row mb-4 border-bottom">
              <div className="d-flex justify-content-between flex-wrap">
                <div className="d-flex mb-3">
                  <div className="customer-icon me-3">
                    <FontAwesomeIcon
                      className="mt-1"
                      style={{ height: "30px" }}
                      icon={faUser}
                    />
                  </div>

                  <div className="customer-info">
                    <h6>Khách hàng</h6>

                    {order.customer.fullName ? (
                      <p className="mb-0">{order.customer.fullName}</p>
                    ) : null}

                    {order.customer.phone ? (
                      <p className="mb-0">{order.customer.phone}</p>
                    ) : null}

                    {order.customer.email ? (
                      <p className="mb-0">{order.customer.email}</p>
                    ) : null}
                  </div>
                </div>

                <div className="d-flex mb-3">
                  <div className="customer-icon me-3">
                    <FontAwesomeIcon
                      className="mt-1"
                      style={{ height: "30px" }}
                      icon={faTruck}
                    />
                  </div>

                  <div className="customer-info">
                    <h6>Đơn vị vận chuyển</h6>

                    {order.customer.fullName ? (
                      <p className="mb-0">{order.customer.fullName}</p>
                    ) : null}

                    {order.customer.phone ? (
                      <p className="mb-0">{order.customer.phone}</p>
                    ) : null}

                    {order.customer.email ? (
                      <p className="mb-0">{order.customer.email}</p>
                    ) : null}
                  </div>
                </div>

                {order.deliveryAddress ? (
                  <div className="d-flex mb-3">
                    <div className="customer-icon me-3">
                      <FontAwesomeIcon
                        className="mt-1"
                        style={{ height: "30px" }}
                        icon={faLocationDot}
                      />
                    </div>

                    <div className="customer-info">
                      <h6>Địa chỉ giao hàng</h6>

                      {order.deliveryAddress ? (
                        <p className="mb-0">{order.deliveryAddress}</p>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <table className="table border">
                <thead>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th className="text-end">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.orderItems.map((orderItem) => {
                    return (
                      <>
                        <tr>
                          <th>
                            <div className="d-flex flex-wrap">
                              <div className="product-image me-3">
                                <img
                                  src={
                                    orderItem.product.productImages[0]
                                      ?.linkToImage
                                  }
                                  width="70"
                                  height="70"
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                              <div className="product-name">
                                {orderItem.product.name}
                              </div>
                            </div>
                          </th>
                          <td>{orderItem.quantity}</td>
                          <td>{toVND(orderItem.product.salePrice)}</td>
                          <td className="text-end">
                            {toVND(
                              orderItem.quantity * orderItem.product.salePrice
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}
