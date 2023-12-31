import { faHeartCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import "moment/locale/vi";
import { toVND } from "~/utils/currency";
import { formatPhoneNumber } from "~/utils/phoneNumber";

export default function TrackingOrderDetail({ order }) {
  document.title = `Tình trạng đơn hàng #${order.id}`;

  return (
    <>
      <div className="px-1">
        <div
          className="card shadow px-4 py-4 mt-3 mx-auto d-flex align-items-center"
          style={{ maxWidth: "660px" }}
        >
          <div className="d-flex flex-column my-3 border-bottom w-100">
            <FontAwesomeIcon
              icon={faHeartCircleCheck}
              style={{ color: "#f0907f", height: "80px" }}
              className="mb-4"
            />

            <h5
              className="mb-2"
              style={{ color: "#f0907f", textAlign: "center" }}
            >
              Cảm ơn bạn đã mua hàng
            </h5>

            <h5 className="text-center mb-0">
              <span className="badge bg-secondary">
                {order.orderStatus?.name}
              </span>
            </h5>

            <div className="mb-3"></div>
          </div>

          <div className="mb-3 border-bottom w-100">
            <div className="row mb-1">
              <div className="col-5">
                <strong>Mã đơn hàng</strong>
              </div>
              <div className="col-7">#{order.id}</div>
            </div>

            <div className="row mb-1">
              <div className="col-5">
                <strong>Ngày đặt hàng</strong>
              </div>
              <div className="col-7">
                {moment(order.createdAt).format("LTS")}
                {" - "}
                {moment(order.createdAt).format("ll")}
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-5">
                <strong>Tên khách hàng</strong>
              </div>
              <div className="col-7">{order.customer?.fullName}</div>
            </div>

            <div className="row mb-1">
              <div className="col-5">
                <strong>Số điện thoại</strong>
              </div>
              <div className="col-7">
                {formatPhoneNumber(order.customer.phone)
                  ? formatPhoneNumber(order.customer.phone)
                  : order.customer.phone}
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-5">
                <strong>Email</strong>
              </div>
              <div className="col-7">{order.customer?.email}</div>
            </div>

            <div className="mb-4"></div>
          </div>

          <div className="mb-3 border-bottom w-100">
            <div className="row mb-1">
              <div className="col-5">
                <strong>Đơn vị vận chuyển</strong>
              </div>
              <div className="col-7">
                {order.shipment?.deliveryCompany?.name}
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-5">
                <strong>Mã vận đơn</strong>
              </div>
              <div className="col-7">{order.shipment?.trackingNumber}</div>
            </div>

            <div className="row mb-1">
              <div className="col-5">
                <strong>Địa chỉ giao hàng</strong>
              </div>
              <div className="col-7">{order.shipment?.address}</div>
            </div>

            <div className="row">
              <div className="col-5">
                <strong>Ghi chú</strong>
              </div>
              <div className="col-7">{order.note}</div>
            </div>

            <div className="mb-4"></div>
          </div>

          <div className="border-bottom w-100">
            <h5 className="mb-3">Các sản phẩm đã đặt</h5>
            {order.orderItems?.map((orderItem) => {
              return (
                <div
                  key={orderItem.id}
                  className="d-flex flex-wrap gap-0 align-items-center mb-3"
                >
                  <div className="w-25 align-self-baseline">
                    <img
                      src={orderItem.product.productImages[0]?.linkToImage}
                      width="80"
                      height="80"
                      className="object-fit-cover rounded"
                    />
                  </div>

                  <div className="w-75">
                    <h6>{orderItem.product.name}</h6>
                    <p className="mb-0">Số lượng: {orderItem.quantity}</p>
                    <p className="mb-0">
                      Đơn giá: {toVND(orderItem.product.salePrice)}
                    </p>
                  </div>
                </div>
              );
            })}
            <h6 className="text-end my-3">
              Tổng thanh toán:{" "}
              <span className="text-danger">{toVND(order.totalPrice)}</span>
            </h6>

            {/* {order.orderItems?.map((orderItem) => {
              return (
                <div key={orderItem.id} className="row align-items-center mb-2">
                  <div className="col-sm-12 col-md-2">
                    <img
                      src={orderItem.product.productImages[0]?.linkToImage}
                      width="80"
                      height="80"
                      className="object-fit-cover rounded"
                    />
                  </div>

                  <div className="col-sm-12 col-md-10 py-2">
                    <h6>{orderItem.product.name}</h6>
                    <p className="mb-0">Số lượng: {orderItem.quantity}</p>
                    <p className="mb-0">
                      Đơn giá: {orderItem.product.salePrice}
                    </p>
                  </div>
                </div>
              );
            })} */}
            <div className="mb-4"></div>
          </div>

          <div className="pt-4 text-center w-75">
            <h6>Cảm ơn bạn đã mua sắm tại website cigarforboss.com</h6>
            <p className="mb-3">
              Nếu có thắc mắc gì về đơn hàng, vui lòng liên hệ với chúng tôi qua
              số điện thoại để được xử lý trong thời gian sớm nhất.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
