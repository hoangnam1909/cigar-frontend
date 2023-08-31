import { useEffect, useState } from "react";
import API, { endpoints } from "~/api/API";
import { formatPhoneNumber } from "~/utils/phoneNumber";
import { REGEX_EMAIL, REGEX_VIETNAMESE_PHONE_NUMBER } from "~/utils/regexUtils";

export default function Contact() {
  document.title = "Liên hệ";

  const [isEmailValid, setIsEmailValid] = useState(0);
  const [isPhoneValid, setIsPhoneValid] = useState(0);
  const [customer, setCustomer] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [sendContactSuccessful, setSendContactSuccessful] = useState(false);

  const handlePhoneNumberInputOnly = (e, setData) => {
    let phoneValue = e.target.value;
    const re = /^[0-9]*$/;
    if (phoneValue.length <= 10) {
      if (phoneValue === "" || re.test(phoneValue)) {
        setData({ ...customer, phone: phoneValue });
      }
    }
  };

  useEffect(() => {
    if (REGEX_EMAIL.test(customer.email)) {
      const checkEmail = async () => {
        const res = await API().get(
          `${endpoints.customer}/validate/${customer.email}`
        );
        setIsEmailValid(res.data.result ? 1 : -1);
      };
      checkEmail();
    }
  }, [customer.email]);

  useEffect(() => {
    if (customer.phone.length >= 10) {
      if (REGEX_VIETNAMESE_PHONE_NUMBER.test(customer.phone) == false) {
        setIsPhoneValid(-1);
        return;
      }

      const checkPhone = async () => {
        const res = await API().get(
          `${endpoints.customer}/validate/${customer.phone}`
        );
        setIsPhoneValid(res.data.result ? 1 : -1);
      };
      checkPhone();
    }
  }, [customer.phone]);

  const clearForm = () => {
    setCustomer({
      ...customer,
      fullName: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const changeMap = (e, link) => {
    e.preventDefault();
    document.getElementById("embed-gmap").src = link;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await API().post(endpoints.customer, [customer]);
    if (res.status === 200) {
      setSendContactSuccessful(true);
      clearForm();
    }
  };

  return (
    <>
      <div className="row g-5 mt-4 mx-auto">
        <div className="col-sm-12 col-md-12 col-xl-3 m-0 mb-3">
          <h4 className="mb-3">CÁC CỬA HÀNG</h4>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                <a
                  href=""
                  onClick={(e) =>
                    changeMap(e, process.env.REACT_APP_HANOI_MAP_SRC)
                  }
                >
                  Cửa hàng 1
                </a>
              </h5>
              <a
                href="https://goo.gl/maps/w1Gy44PXnDnjzscn9"
                className="card-text"
                target="_blank"
                rel="noreferrer"
              >
                {process.env.REACT_APP_HANOI_ADDRESS}
              </a>
              <p className="card-text">
                Số điện thoại:{" "}
                {formatPhoneNumber(process.env.REACT_APP_HANOI_ZALO_NUMBER)}
              </p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">
                <a
                  href=""
                  onClick={(e) =>
                    changeMap(e, process.env.REACT_APP_HCM_MAP_SRC)
                  }
                >
                  Cửa hàng 2
                </a>
              </h5>
              <a
                href="https://goo.gl/maps/sNuHUfur6QJpmcuN8"
                className="card-text"
                target="_blank"
                rel="noreferrer"
              >
                {process.env.REACT_APP_HCM_ADDRESS}
              </a>
              <p className="card-text">
                Số điện thoại:{" "}
                {formatPhoneNumber(process.env.REACT_APP_HCM_ZALO_NUMBER)}
              </p>
            </div>
          </div>
        </div>

        <div className="col-sm-12 col-md-6 col-xl-4 m-0 mb-3">
          <h4 className="mb-3">LIÊN HỆ VỚI CHÚNG TÔI</h4>
          <form className="needs-validation" onSubmit={handleSubmitForm}>
            <div className="row g-3">
              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    value={customer.fullName}
                    onChange={(e) => {
                      setCustomer({ ...customer, fullName: e.target.value });
                    }}
                    required
                  />
                  <label>Họ và tên</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="email"
                    className={`form-control ${
                      isEmailValid == 0
                        ? ""
                        : isEmailValid == 1
                        ? "is-valid"
                        : "is-invalid"
                    }`}
                    value={customer?.email}
                    onChange={(e) => {
                      if (REGEX_EMAIL.test(customer.email)) setIsEmailValid(0);
                      setCustomer({ ...customer, email: e.target.value });
                    }}
                    required
                  />
                  <div className="valid-feedback">
                    Email này có thể sử dụng!
                  </div>
                  <div className="invalid-feedback">Email đã tồn tại!</div>
                  <label>Email</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${
                      isPhoneValid == 0
                        ? ""
                        : isPhoneValid == 1
                        ? "is-valid"
                        : "is-invalid"
                    }`}
                    value={customer?.phone}
                    onChange={(e) => {
                      if (e.target.value.length < 10) setIsPhoneValid(0);
                      handlePhoneNumberInputOnly(e, setCustomer);
                    }}
                    required
                  />
                  <div className="valid-feedback">
                    Số điện thoại này có thể sử dụng!
                  </div>
                  <div className="invalid-feedback">
                    Số điện thoại không hợp lệ hoặc đã được đăng ký trước đó!
                  </div>
                  <label>Số điện thoại</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    value={customer?.address}
                    onChange={(e) => {
                      setCustomer({ ...customer, address: e.target.value });
                    }}
                    required
                  />
                  <label>Địa chỉ</label>
                </div>
              </div>

              {sendContactSuccessful ? (
                <>
                  <div className="col-12 text-center">
                    <div className="alert alert-success mb-0" role="alert">
                      Gửi liên hệ thành công!
                    </div>
                  </div>
                </>
              ) : null}

              <div className="col-12 text-center">
                <button className="w-100 btn btn-secondary" type="submit">
                  Gửi liên hệ
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-sm-12 col-md-6 col-xl-5 m-0 mb-3">
          <iframe
            src={process.env.REACT_APP_HANOI_MAP_SRC}
            id="embed-gmap"
            width="100%"
            height="500"
            className="rounded"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}
