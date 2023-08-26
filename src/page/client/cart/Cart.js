import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/Cart.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import {
  deleteByProductId,
  getCart,
  getOrderItems,
  updateQuantity,
} from "~/service/CartService";
import { faCircleCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { nameNormalization } from "~/utils/input";
import EmptyCart from "./EmptyCart";
import OrderSuccessful from "./OrderSuccessful";

export default function Cart() {
  document.title = "Giỏ hàng";

  const [orderSuccessful, setOrderSuccessful] = useState(0);
  const [order, setOrder] = useState();

  const [provinces, setProvinces] = useState();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();

  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();

  const [cart, setCart] = useState();

  const [orderRequest, setOrderRequest] = useState({
    fullName: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    note: "",
  });

  useEffect(() => {
    async function getProvinces() {
      const res = await API().get("https://provinces.open-api.vn/api/p/");
      if (res.status === 200) setProvinces(res.data);
    }

    getProvinces();
    setCart(getCart());
  }, []);

  useEffect(() => {
    if (province) {
      async function getDistricts() {
        const res = await API().get(
          `https://provinces.open-api.vn/api/p/${province.code}?depth=2`
        );
        if (res.status === 200) setDistricts(res.data.districts);
      }

      getDistricts();
    }

    setDistricts();
    setWards();
  }, [province]);

  useEffect(() => {
    if (district) {
      async function getWards() {
        const res = await API().get(
          `https://provinces.open-api.vn/api/d/${district.code}?depth=2`
        );
        if (res.status === 200) setWards(res.data.wards);
      }

      getWards();
    }

    setWards();
  }, [district]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    let requestBody = { ...orderRequest };
    let address = "";
    if (requestBody.deliveryAddress.trim().length > 0)
      address += requestBody.deliveryAddress;
    if (ward) address += `, ${ward.name}`;
    if (district) address += `, ${district.name}`;
    if (province) address += `, ${province.name}`;

    requestBody = {
      ...requestBody,
      fullName: nameNormalization(requestBody.fullName),
      email: requestBody.email.trim(),
      deliveryAddress: address,
      orderItems: getOrderItems(),
    };

    async function addOrder() {
      const res = await API().post(endpoints.order, requestBody);
      if (res.status === 200) {
        localStorage.removeItem("cart");
        setOrderSuccessful(1);
        setOrder(res.data.result);
      } else {
        setOrderSuccessful(-1);
      }
    }

    addOrder();
  };

  if (orderSuccessful == 1) {
    return <OrderSuccessful order={order} />;
  }

  if (cart?.length == 0 || cart == null) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="row mt-3">
        <div className="card col-sm-12 col-lg-7 px-4 py-3 me-3">
          <h5 className="mb-3">THÔNG TIN NGƯỜI MUA HÀNG</h5>
          <form onSubmit={handleSubmitForm}>
            <div className="row g-2">
              <div className="col-md">
                <div className="form-floating me-1 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={orderRequest.fullName}
                    onChange={(e) => {
                      setOrderRequest({
                        ...orderRequest,
                        fullName: e.target.value,
                      });
                    }}
                    required
                  />
                  <label>Họ và tên (*)</label>
                </div>
              </div>

              <div className="col-md">
                <div className="form-floating mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={orderRequest.phone}
                    onChange={(e) => {
                      setOrderRequest({
                        ...orderRequest,
                        phone: e.target.value,
                      });
                    }}
                    required
                  />
                  <label>Số điện thoại (*)</label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3 mt-3 mt-md-0">
              <input
                type="email"
                className="form-control"
                value={orderRequest.email}
                onChange={(e) => {
                  setOrderRequest({ ...orderRequest, email: e.target.value });
                }}
              />
              <label>Email</label>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-md mt-md-2">
                <select
                  className="form-select"
                  defaultValue={"0"}
                  onChange={(e) => {
                    let value = e.target.value;
                    setProvince({
                      code: value.split("|")[0],
                      name: value.split("|")[1],
                    });
                  }}
                >
                  <option value="0">Chọn Tỉnh Thành</option>
                  {provinces?.map((province, index) => {
                    return (
                      <option
                        key={index}
                        value={`${province.code}|${province.name}`}
                      >
                        {province.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md mt-3 mt-md-2">
                <select
                  className="form-select"
                  defaultValue={"0"}
                  onChange={(e) => {
                    let value = e.target.value;
                    setDistrict({
                      code: value.split("|")[0],
                      name: value.split("|")[1],
                    });
                  }}
                >
                  <option value="0">Chọn Quận Huyện</option>
                  {districts?.map((district, index) => {
                    return (
                      <option
                        key={index}
                        value={`${district.code}|${district.name}`}
                      >
                        {district.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="col-md mt-3 mt-md-2">
                <select
                  className="form-select"
                  defaultValue={"0"}
                  onChange={(e) => {
                    let value = e.target.value;
                    setWard({
                      code: value.split("|")[0],
                      name: value.split("|")[1],
                    });
                  }}
                >
                  <option value="0">Chọn Phường Xã</option>
                  {wards?.map((ward, index) => {
                    return (
                      <option key={index} value={`${ward.code}|${ward.name}`}>
                        {ward.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                value={orderRequest.deliveryAddress}
                onChange={(e) => {
                  setOrderRequest({
                    ...orderRequest,
                    deliveryAddress: e.target.value,
                  });
                }}
              />
              <label>Địa chỉ (Nhập chính xác số nhà, ngõ,...)</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                value={orderRequest.note}
                onChange={(e) => {
                  setOrderRequest({ ...orderRequest, note: e.target.value });
                }}
              />
              <label>Ghi chú cho đơn hàng</label>
            </div>

            {orderSuccessful == -1 ? (
              <div className="text-center">
                <div className="alert alert-danger w-75 mx-auto" role="alert">
                  A simple danger alert—check it out!
                </div>
              </div>
            ) : null}

            <div className="text-center mb-1">
              <input
                type="submit"
                className="btn btn-dark w-50"
                value="Đặt hàng ngay"
              />
            </div>
          </form>
        </div>

        <div className="card cart-card col-sm-12 col-lg px-4 py-3 me-3">
          <h5 className="mb-3">Giỏ hàng</h5>
          {cart?.map((product, index) => {
            return (
              <div
                key={index}
                className="row mb-3 pb-3 border-bottom border-secondary-subtle"
              >
                <div className="col-4 col-sm-3 col-md-2 col-lg-3 col-xl-3 align-self-center">
                  <Link to={`${endpoints.products}/${product.id}`}>
                    <img
                      width="80"
                      height="80"
                      src={product.image}
                      className="rounded"
                      style={{ objectFit: "cover" }}
                    />
                  </Link>
                </div>

                <div className="col-8 col-sm-7 col-md-8 col-lg-6 col-xl-6">
                  <Link to={`${endpoints.products}/${product.id}`}>
                    <h6>{product.name}</h6>
                    <p className="form-text mb-2">{`Giá sản phẩm: ${
                      product.salePrice === 0 ? "Liên hệ" : product.salePrice
                    }`}</p>
                  </Link>
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      deleteByProductId(product.id);
                      setCart(getCart());
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-1" /> Xoá
                  </a>
                </div>

                <div className="col-12 mt-2 mt-sm-0 col-sm-2 col-md-2 col-lg-3 col-xl-3 align-self-center">
                  <input
                    type="text"
                    className="form-control text-center"
                    value={product.quantity}
                    onChange={(e) => {
                      updateQuantity(product.id, e.target.value);
                      setCart(getCart());
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div className="row">
            <div className="col-4">
              <h6>Tổng cộng: </h6>
            </div>
            <div className="col-8">
              <p className="text-end">Chúng tôi sẽ liên hệ lại với bạn sau.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <h6>Phí vận chuyển: </h6>
            </div>
            <div className="col-8">
              <p className="text-end">Chúng tôi sẽ liên hệ lại với bạn sau.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
