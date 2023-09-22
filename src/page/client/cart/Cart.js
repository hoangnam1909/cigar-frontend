import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/Cart.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import {
  deleteByProductId,
  getCart,
  getOrderItems,
  getProductIdsCart,
  updateCart,
  updateQuantity,
} from "~/service/CartService";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { nameNormalization } from "~/utils/input";
import EmptyCart from "./EmptyCart";
import OrderSuccessful from "./OrderSuccessful";
import ScrollTop from "~/utils/ScrollTop";
import { toVND } from "~/utils/currency";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [orderRequest, setOrderRequest] = useState({
    fullName: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    note: "",
  });

  const getProductsInCart = async () => {
    const res = await API().get(endpoints.carts, {
      params: {
        ids: getProductIdsCart(),
      },
    });
    if (res.status === 200) {
      let result = res.data.result;
      updateCart(result);
      let currentCart = JSON.parse(localStorage.getItem("cart"));
      result = result.map((r) => ({
        ...r,
        quantity: currentCart.find((c) => r.id === c.id).quantity,
      }));
      setCart(result);
    }
  };

  const getProvinces = async () => {
    const res = await API().get("https://provinces.open-api.vn/api/p/");
    if (res.status === 200) setProvinces(res.data);
  };

  useEffect(() => {
    getProvinces();
    getProductsInCart();
  }, []);

  useEffect(() => {
    if (province) {
      const getDistricts = async () => {
        const res = await API().get(
          `https://provinces.open-api.vn/api/p/${province.code}?depth=2`
        );
        if (res.status === 200) setDistricts(res.data.districts);
      };

      getDistricts();
    }

    setDistricts();
    setWards();
  }, [province]);

  useEffect(() => {
    if (district) {
      const getWards = async () => {
        const res = await API().get(
          `https://provinces.open-api.vn/api/d/${district.code}?depth=2`
        );
        if (res.status === 200) setWards(res.data.wards);
      };

      getWards();
    }

    setWards();
  }, [district]);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    let requestBody = { ...orderRequest };
    let address = "";
    if (requestBody.deliveryAddress.trim().ength > 0)
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
      setIsSubmitting(true);

      const res = await API().post(endpoints.order, requestBody);
      if (res.status === 200) {
        localStorage.setItem("cart", "[]");
        setOrderSuccessful(1);
        setOrder(res.data.result);
      } else {
        setOrderSuccessful(-1);
      }

      setIsSubmitting(false);
    }

    addOrder();
  };

  if (orderSuccessful == 1) {
    <ScrollTop />;
    return <OrderSuccessful order={order} />;
  }

  if (cart?.length == 0 || cart == null) return <EmptyCart />;

  return (
    <>
      <div className="row mx-auto mt-3">
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
                    minLength="10"
                    maxLength="10"
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
              <button
                className="btn btn-secondary w-50"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                ) : null}
                <span role="status">Đặt hàng ngay</span>
              </button>
            </div>
          </form>
        </div>

        <div className="card cart-card col-sm-12 col-lg px-4 py-3 me-3">
          <h5 className="mb-3">Giỏ hàng ({cart?.length})</h5>
          {cart
            ?.sort((c1, c2) => {
              return c2.unitsInStock - c1.unitsInStock;
            })
            .map((product, index) => {
              return (
                <div
                  key={index}
                  className={`d-flex gap-3 mb-3 pb-3 border-bottom border-secondary-subtle ${
                    product.unitsInStock == 0 ? "opacity-50" : ""
                  }`}
                >
                  <div className="mb-3 mb-sm-0 align-self-baseline">
                    <Link to={`${endpoints.products}/${product.id}`}>
                      <img
                        width="100"
                        height="100"
                        src={product.image}
                        className="rounded"
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                  </div>

                  <div className="w-100 mb-3 mb-sm-0">
                    <Link to={`${endpoints.products}/${product.id}`}>
                      <h6>{product.name}</h6>
                      <p className="form-text my-1">
                        {product.unitsInStock != 0 ? (
                          <span>Số lượng còn lại: {product.unitsInStock}</span>
                        ) : (
                          <>
                            <span className="text-danger text-uppercase fw-medium">
                              Hết hàng
                            </span>
                            <br />
                            <span className="fw-medium">
                              Sản phẩm này sẽ không được đặt
                            </span>
                          </>
                        )}
                      </p>
                      <p className="form-text mb-2">
                        {`Giá sản phẩm: ${
                          product.salePrice === 0
                            ? "Liên hệ"
                            : toVND(product.salePrice)
                        }`}
                      </p>
                    </Link>
                  </div>

                  <div className="d-flex flex-column align-items-baseline">
                    <input
                      type="text"
                      className="form-control text-center mb-3"
                      disabled={product.unitsInStock == 0}
                      value={product.quantity}
                      onChange={(e) => {
                        if (e.target.value < 1) updateQuantity(product.id, 1);
                        else updateQuantity(product.id, e.target.value);

                        getProductsInCart();
                      }}
                    />
                    <a
                      className="w-100 text-center"
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        deleteByProductId(product.id);
                        getProductsInCart();
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} className="me-1" /> Xoá
                    </a>
                  </div>
                </div>

                // <div
                //   key={index}
                //   className={`row mb-3 pb-3 border-bottom border-secondary-subtle ${
                //     product.unitsInStock == 0 ? "opacity-50" : ""
                //   }`}
                // >
                //   <div className="mb-3 mb-sm-0 col-12 col-sm-3 col-md-2 col-lg-4 col-xl-3 align-self-center">
                //     <Link to={`${endpoints.products}/${product.id}`}>
                //       <img
                //         width="95"
                //         height="95"
                //         src={product.image}
                //         className="rounded"
                //         style={{ objectFit: "cover" }}
                //       />
                //     </Link>
                //   </div>

                //   <div className="mb-3 mb-sm-0 col-12 col-sm-7 col-md-8 col-lg-6 col-xl-6">
                //     <Link to={`${endpoints.products}/${product.id}`}>
                //       <h6>{product.name}</h6>
                //       <p className="form-text my-1">
                //         {product.unitsInStock != 0 ? (
                //           <span>Số lượng còn lại: {product.unitsInStock}</span>
                //         ) : (
                //           <>
                //             <span className="text-danger text-uppercase fw-medium">
                //               Hết hàng
                //             </span>
                //             <br />
                //             <span className="fw-medium">
                //               Sản phẩm này sẽ không được đặt
                //             </span>
                //           </>
                //         )}
                //       </p>
                //       <p className="form-text mb-2">
                //         {`Giá sản phẩm: ${
                //           product.salePrice === 0
                //             ? "Liên hệ"
                //             : toVND(product.salePrice)
                //         }`}
                //       </p>
                //     </Link>
                //     <a
                //       href=""
                //       onClick={(e) => {
                //         e.preventDefault();
                //         deleteByProductId(product.id);
                //         getProductsInCart();
                //       }}
                //     >
                //       <FontAwesomeIcon icon={faTrash} className="me-1" /> Xoá
                //     </a>
                //   </div>

                //   <div className="col-12 mt-2 mt-sm-0 col-sm-2 col-md-2 col-lg-2 col-xl-3 align-self-center">
                //     <input
                //       type="text"
                //       className="form-control text-center"
                //       disabled={product.unitsInStock == 0}
                //       value={product.quantity}
                //       onChange={(e) => {
                //         if (e.target.value < 1) updateQuantity(product.id, 1);
                //         else updateQuantity(product.id, e.target.value);

                //         getProductsInCart();
                //       }}
                //     />
                //   </div>
                // </div>
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
