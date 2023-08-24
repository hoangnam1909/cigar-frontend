import { useState } from "react";
import API, { endpoints } from "~/api/API";
import DangerAlert from "~/components/alert/DangerAlert";
import TrackingOrderDetail from "./TrackingOrderDetail";

export default function TrackingOrder() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState();

  const [isSuccess, setIsSuccess] = useState(0);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const getOrder = async () => {
      const res = await API().get(`${endpoints.trackingOrder}`, {
        params: {
          orderId: orderId,
          phone: phone,
        },
      });
      if (res.data.result != null) setOrder(res.data.result);
      else setIsSuccess(-1);
    };

    getOrder();
  };

  if (order != null) {
    return <TrackingOrderDetail order={order} />;
  }

  return (
    <>
      <div className="card py-3 px-4 mt-3">
        <h4>Kiểm tra tình trạng đơn hàng</h4>
        <form onSubmit={handleSubmitForm}>
          <div className="mb-3">
            <label className="form-label">Mã đơn hàng</label>
            <input
              type="text"
              className="form-control"
              placeholder="123456"
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Số điện thoại đặt hàng</label>
            <input
              type="text"
              className="form-control"
              placeholder="0123456789"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
          </div>

          {isSuccess == -1 ? (
            <DangerAlert message="Thông tin đơn hàng không chính xác!" />
          ) : null}

          <button type="submit" className="btn btn-secondary">
            Tra cứu đơn hàng
          </button>
        </form>
      </div>
    </>
  );
}
