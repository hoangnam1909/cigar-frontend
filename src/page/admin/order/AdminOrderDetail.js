import {
  faMapLocationDot,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminEndpoints } from "~/api/API";
import moment from "moment";
import "moment/locale/vi";
import { toVND } from "~/utils/currency";
import AuthAPI from "~/api/AuthAPI";
import OrderStatusForm from "~/components/order/OrderStatusForm";
import DeliveryPartner from "~/components/order/DeliveryPartner";
import { formatPhoneNumber } from "~/utils/phoneNumber";

export default function AdminOrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  const getOrder = async () => {
    const res = await AuthAPI().get(`${adminEndpoints.orders}/${orderId}`);
    if (res.status === 200) setOrder(res.data.result);
  };

  useEffect(() => {
    getOrder();
  }, []);

  if (order) {
    return (
      <>
        <div className="container-fluid mt-3">
          <h3 className="mt-2 mb-4 text-gray-800">Đơn hàng #{orderId}</h3>

          <div className="row">
            <div className="col-8">
              <div className="card shadow p-4 mb-4">
                <div className="mb-4 d-flex justify-content-between border-bottom pb-3">
                  <h5 className="mb-1">
                    {moment(order.createdAt).format("LTS")}
                    {" - "}
                    {moment(order.createdAt).format("LL")}
                  </h5>
                  <h6 className="mb-1">
                    Tình trạng:{" "}
                    <span className="text-danger">
                      {order.orderStatus?.name}
                    </span>
                  </h6>
                </div>

                {/* <div className="row mb-3 border-bottom"> */}
                <div className="row">
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
                          <p className="mb-0">
                            {formatPhoneNumber(order.customer.phone)}
                          </p>
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
                        <h6>Đối tác giao hàng</h6>

                        <p className="mb-0">
                          {order.shipment?.deliveryCompany?.name}
                        </p>

                        <p className="mb-0">{order.shipment?.trackingNumber}</p>
                      </div>
                    </div>

                    <div className="d-flex mb-3">
                      <div className="customer-icon me-3">
                        <FontAwesomeIcon
                          className="mt-1"
                          style={{ height: "30px" }}
                          icon={faMapLocationDot}
                        />
                      </div>

                      <div className="customer-info">
                        <h6>Địa chỉ giao hàng</h6>
                        <p className="mb-0">{order.shipment?.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-border">
                    <thead>
                      <tr className="border-top">
                        <td className="fw-semibold">Sản phẩm</td>
                        <td className="fw-semibold text-center">Số lượng</td>
                        <td className="fw-semibold text-end">Đơn giá</td>
                        <td className="fw-semibold text-end">Thành tiền</td>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.orderItems
                        .sort((item1, item2) => {
                          return item1.id - item2.id;
                        })
                        .map((orderItem, index) => {
                          return (
                            <tr key={index}>
                              <td>
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
                                      className="rounded"
                                    />
                                  </div>

                                  <div className="product-name">
                                    <p className="fw-medium">
                                      {orderItem.product.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center align-middle">
                                {orderItem.quantity}
                              </td>
                              <td className="text-end align-middle">
                                {toVND(orderItem.product.salePrice)}
                              </td>
                              <td className="text-end align-middle">
                                {toVND(
                                  orderItem.quantity *
                                    orderItem.product.salePrice
                                )}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                    <tfoot>
                      <tr className="border-top">
                        <td className="fw-medium" colSpan={"3"}>
                          Tổng tiền
                        </td>
                        <td className="fw-semibold text-end">
                          {toVND(order.totalPrice)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-4 pe-4">
              <div className="row">
                <div className="card shadow p-4 mb-4">
                  <h5 className="mb-3 text-gray-800">Tình trạng đơn hàng</h5>

                  <OrderStatusForm order={order} getOrder={getOrder} />
                </div>
              </div>

              <div className="row">
                <div className="card shadow p-4 mb-4">
                  <h5 className="mb-3 text-gray-800">Đối tác giao hàng</h5>

                  <DeliveryPartner order={order} getOrder={getOrder} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
