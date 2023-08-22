import { useEffect, useState } from "react";
import API, { endpoints } from "~/api/API";
import { REGEX_VIETNAMESE_PHONE_NUMBER } from "~/utils/regexUtils";

export default function Contact() {
  document.title = "Cigar For Boss - Liên hệ";
  const [isEmailValid, setIsEmailValid] = useState();
  const [isPhoneValid, setIsPhoneValid] = useState();
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const validateCustomer = () => {
    if (!REGEX_VIETNAMESE_PHONE_NUMBER.test(customer.phone)) {
      return false;
    }

    return true;
  };

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
    const checkEmail = async () => {
      const res = API().get(
        `${endpoints.customer}/validate/email/${customer.email}`
      );
    };
  }, [customer.email]);

  useEffect(() => {}, [customer.phone]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (validateCustomer()) {
      console.log(customer);
    }
  };

  return (
    <>
      <div className="row g-5 mt-4">
        <div className="col-md-4 m-0">
          <h4 className="mb-3">LIÊN HỆ VỚI CHÚNG TÔI</h4>
          <form className="needs-validation" onSubmit={handleSubmitForm}>
            <div className="row g-3">
              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${true ? "is-valid" : ""}`}
                    value={customer?.name}
                    onChange={(e) => {
                      setCustomer({ ...customer, fullName: e.target.value });
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <label>Họ và tên</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="email"
                    className={`form-control ${true ? "is-valid" : ""}`}
                    value={customer?.email}
                    onChange={(e) => {
                      setCustomer({ ...customer, email: e.target.value });
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <label>Email</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${true ? "is-valid" : ""}`}
                    value={customer?.phone}
                    onChange={(e) => {
                      handlePhoneNumberInputOnly(e, setCustomer);
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <label>Số điện thoại</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className={`form-control ${true ? "is-valid" : ""}`}
                    value={customer?.address}
                    onChange={(e) => {
                      setCustomer({ ...customer, address: e.target.value });
                    }}
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <label>Địa chỉ</label>
                </div>
              </div>

              {/* <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    style={{ height: "120px" }}
                    onChange={(e) => {
                      e.target.style.height = "";
                      e.target.style.height =
                        Math.max(e.target.scrollHeight, 120) + "px";
                    }}
                  ></textarea>
                  <label>Lời nhắn</label>
                </div>
              </div> */}

              <div className="col-12 text-center">
                <button className="w-100 btn btn-secondary" type="submit">
                  Gửi liên hệ
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="col-md-8 m-0">
          <img
            className="w-100 h-100 rounded"
            style={{ objectFit: "cover" }}
            src="https://findycigars.com/cdn/shop/articles/mohd-jon-ramlan-ItGeEBMBurE-unsplash_1_1_1445x.jpg?v=1660258387"
          />
        </div>
      </div>
    </>
  );
}
