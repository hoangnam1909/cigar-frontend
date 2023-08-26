import { useState } from "react";
import API, { endpoints } from "~/api/API";
import DangerAlert from "~/components/alert/DangerAlert";
import TrackingOrderDetail from "./TrackingOrderDetail";
import ReCAPTCHA from "react-google-recaptcha";

export default function TrackingOrder() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState();
  const [captchaVerified, setCaptchaVerified] = useState(0);

  const [isSuccess, setIsSuccess] = useState(0);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (captchaVerified != 1) {
      setCaptchaVerified(-1);
      return;
    }

    const getOrder = async () => {
      const res = await API().get(`${endpoints.trackingOrder}`, {
        params: {
          orderId: orderId,
          phone: phone,
        },
      });
      if (res.data.result != null) setOrder(res.data.result);
      else {
        setCaptchaVerified(0);
        window.grecaptcha.reset();
        setIsSuccess(-1);
      }
    };

    getOrder();
  };

  if (order != null) return <TrackingOrderDetail order={order} />;

  return (
    <>
      <div className="card py-3 px-4 mt-3">
        <h4>Kiểm tra tình trạng đơn hàng</h4>
        <form onSubmit={handleSubmitForm}>
          <div className="my-3">
            <label className="form-label">Mã đơn hàng</label>
            <input
              type="text"
              className="form-control"
              placeholder="123456"
              value={orderId}
              onChange={(e) => {
                setIsSuccess(0);
                setOrderId(e.target.value);
              }}
              required
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
                setIsSuccess(0);
                setPhone(e.target.value);
              }}
              required
            />
          </div>

          {isSuccess == -1 ? (
            <DangerAlert message="Thông tin đơn hàng không chính xác!" />
          ) : null}

          {captchaVerified == -1 ? (
            <DangerAlert message="Xác thực thất bại!" />
          ) : null}

          <div className="mb-3">
            <ReCAPTCHA
              sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY}
              onChange={() => {
                setCaptchaVerified(1);
              }}
            />
          </div>

          <button type="submit" className="btn btn-secondary">
            Tra cứu đơn hàng
          </button>
        </form>
      </div>
    </>
  );
}
