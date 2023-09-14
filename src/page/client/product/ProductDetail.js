import "./css/ProductDetail.css";

import { useParams } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import { toVND } from "~/utils/currency";
import { formatPhoneNumber } from "~/utils/phoneNumber";
import { useEffect, useState } from "react";
import ProductDetailSkeleton from "./skeleton/ProductDetailSkeleton";
import { ZaloIcon } from "~/assets/img/ZaloIcon";
import { getIdInRewriteUrl } from "~/utils/input";
import { addProductToCart } from "~/service/CartService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Modal from "~/components/modal/Modal";
import ProductsView from "~/layout/component/product/ProductsView";
import ProductsSkeletonView from "~/layout/component/product/skeleton/ProductsSkeletonView";
import $ from "jquery";

export default function ProductDetail() {
  const { productRewriteUrl } = useParams();
  const productId = getIdInRewriteUrl(productRewriteUrl);
  const [product, setProduct] = useState();
  const [productsSuggest, setProductsSuggest] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getProduct() {
      const res = await API().get(`${endpoints.products}/${productId}`);
      if (res.status === 200) {
        setIsSuccess(true);
        setProduct(res.data.result);
      }
    }

    async function getSuggestProducts() {
      const res = await API().get(`${endpoints.productsSuggest}/${productId}`, {
        params: {
          count: 6,
        },
      });
      if (res.status === 200) {
        setProductsSuggest(res.data.result);
      }
    }

    getProduct();
    getSuggestProducts();
  }, [productId]);

  const changeProductImage = (link) => {
    if (isSuccess) {
      document.getElementById("main-product-image").src = link;
    }
  };

  document.title = product ? product.name : "Loading...";

  return (
    <>
      {product ? (
        <>
          <div className="card shadow my-3">
            <div className="row g-0">
              <div className="col-md border-end">
                <div className="d-flex flex-column h-100">
                  <div className="main_image p-3 pb-1">
                    <img
                      src={product.productImages[0]?.linkToImage}
                      id="main-product-image"
                      width={"100%"}
                      height="500"
                      style={{
                        objectFit: "contain",
                        borderRadius: "4px",
                      }}
                      alt="main-product-image"
                    />
                  </div>

                  <div className="w-100 px-3 pt-2 pb-3">
                    <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
                      {product.productImages.map((image) => {
                        if (image.linkToImage.startsWith("http")) {
                          return (
                            <div
                              className="m-1"
                              key={image.id}
                              onClick={() =>
                                changeProductImage(image.linkToImage)
                              }
                            >
                              <img
                                src={image.linkToImage}
                                width="80"
                                height="80"
                                alt={`thumbnail-image${image.id}`}
                                className="thumbnail-image rounded object-fit-cover"
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                  {/* <div className="thumbnail_images">
                    <ul id="thumbnail" className="pt-3 px-1">
                      {product.productImages.map((image) => {
                        if (image.linkToImage.startsWith("http")) {
                          return (
                            <li
                              key={image.id}
                              className="m-1"
                              onClick={() =>
                                changeProductImage(image.linkToImage)
                              }
                            >
                              <img
                                src={image.linkToImage}
                                width="75"
                                height="75"
                                alt="thumbnail_image"
                                className="rounded object-fit-cover"
                              />
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div> */}
                </div>
              </div>

              <div className="col-md-6 d-flex flex-column justify-content-between">
                <div className="p-3 right-side">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{product.name}</h3>
                  </div>

                  {product.unitsInStock == 0 ? (
                    <>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-6 badge bg-danger my-1">Hết hàng</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-6 badge bg-success my-1">Còn hàng</p>
                      </div>
                    </>
                  )}

                  {/* {product.attributes.length > 0 ? (
                    <div className="mt-2 pr-3" style={{ textAlign: "justify" }}>
                      <p>
                        <strong>
                          {product.attributes[0].productAttributeResponse.name}
                        </strong>
                        : {product.attributes[0].value}
                      </p>
                    </div>
                  ) : null} */}

                  <div className="mt-2 pr-3" style={{ textAlign: "justify" }}>
                    {product.description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    ) : (
                      "Mô tả sản phẩm"
                    )}
                  </div>
                </div>
                <div className="bottom-panel px-3 pb-4">
                  {product.originalPrice != 0 || product.salePrice != 0 ? (
                    <>
                      <h3 className="d-flex flex-row flex-wrap align-items-baseline">
                        <span className="text-danger me-2">
                          {toVND(product?.salePrice)}
                        </span>
                        <span className="h6 text-decoration-line-through me-2">
                          {toVND(product?.originalPrice)}
                        </span>
                        <span className="h6 text-danger">
                          Tiết kiệm{" "}
                          {toVND(product?.originalPrice - product.salePrice)}
                        </span>
                      </h3>
                    </>
                  ) : null}

                  <div className="d-flex flex-column gap-3">
                    <h5 className="card-title text-start text-primary lh-base mb-0">
                      Gọi điện trực tiếp:
                      <br />
                      <a
                        href={`tel:${process.env.REACT_APP_HANOI_ZALO_NUMBER}`}
                      >
                        {formatPhoneNumber(
                          process.env.REACT_APP_HANOI_ZALO_NUMBER
                        )}
                      </a>{" "}
                      hoặc{" "}
                      <a href={`tel:${process.env.REACT_APP_HCM_ZALO_NUMBER}`}>
                        {formatPhoneNumber(
                          process.env.REACT_APP_HCM_ZALO_NUMBER
                        )}
                      </a>
                    </h5>
                    <div className="btn-group group w-100" role="group">
                      <button
                        type="button"
                        className="btn btn-primary rounded-3"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <ZaloIcon className="me-2" size="35px" />
                        Zalo
                      </button>
                      <ul className="dropdown-menu w-100">
                        <li>
                          <a
                            className="dropdown-item"
                            target="_blank"
                            rel="noreferrer"
                            href={`https://zalo.me/${process.env.REACT_APP_HANOI_ZALO_NUMBER}`}
                          >
                            <ZaloIcon className="me-2" size="35px" />
                            Hà Nội
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            target="_blank"
                            rel="noreferrer"
                            href={`https://zalo.me/${process.env.REACT_APP_HCM_ZALO_NUMBER}`}
                          >
                            <ZaloIcon className="me-2" size="35px" />
                            Thành phố Hồ Chí Minh
                          </a>
                        </li>
                      </ul>
                    </div>

                    <button
                      className="btn btn-outline-secondary w-100"
                      onClick={() => {
                        addProductToCart(product);
                        setShowModal(true);
                      }}
                      disabled={product.unitsInStock == 0}
                    >
                      <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <ProductDetailSkeleton />
        </>
      )}

      <div className="my-3 py-3">
        <h4 className="ps-1 mb-3 text-center text-lg-start">
          Sản Phẩm Tương Tự
        </h4>
        {productsSuggest ? (
          <ProductsView
            products={productsSuggest}
            className={"mx-auto w-100"}
            columnClassName={"col-6 col-md-4 col-lg-3 col-xl-2 px-1"}
            cardClassName={"border"}
          />
        ) : (
          <ProductsSkeletonView
            count={6}
            className={"mx-auto w-100"}
            columnClassName="col-6 col-md-4 col-lg-3 col-xl-2 px-1"
            cardClassName={"border"}
          />
        )}
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        id={product?.id}
        type={"product"}
        title={"Thêm sản phẩm vào giỏ hàng thành công"}
        content={product}
      />
    </>
  );
}
