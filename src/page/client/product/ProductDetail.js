import "./css/ProductDetail.css";

import { useParams } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import { toVND } from "~/utils/currency";
import { formatPhoneNumber } from "~/utils/phoneNumber";
import { useEffect, useState } from "react";
import ProductDetailSkeleton from "./skeleton/ProductDetailSkeleton";
import ProductCardMini from "~/layout/component/product/ProductCardMini";
import { ZaloIcon } from "~/assets/img/ZaloIcon";
import ProductCardMiniSkeleton from "~/layout/component/product/skeleton/ProductCardMiniSkeleton";

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [productsSuggest, setProductsSuggest] = useState();
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    async function getProduct() {
      const res = await API().get(`${endpoints.products}/${productId}`);
      if (res.status === 200) {
        setIsSuccess(true);
        setProduct(res.data.result);
      }
    }

    async function getSuggestProducts() {
      const res = await API().get(`${endpoints.productsSuggest}/${productId}`);
      if (res.status === 200) {
        setProductsSuggest(res.data.result);
      }
    }

    getProduct();
    getSuggestProducts();
  }, [productId]);

  const changeProductImage = (link) => {
    if (isSuccess) {
      document.getElementById("main_product_image").src = link;
    }
  };

  if (!isSuccess || product == null) {
    return <ProductDetailSkeleton />;
  }

  document.title = product ? product.name : "Loading...";

  return (
    <>
      <div className="card my-3">
        <div className="row g-0">
          <div className="col-md-7 border-end">
            <div className="d-flex flex-column justify-content-center">
              <div className="main_image p-4 pb-1">
                <img
                  src={product.productImages[0]?.linkToImage}
                  id="main_product_image"
                  height="450"
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                  alt="main_product_image"
                />
              </div>
              <div className="thumbnail_images">
                <ul id="thumbnail">
                  {product.productImages.map((image) => {
                    if (image.linkToImage.startsWith("http")) {
                      return (
                        <li
                          key={image.id}
                          onClick={() => changeProductImage(image.linkToImage)}
                        >
                          <img
                            src={image.linkToImage}
                            height="100"
                            alt="thumbnail_image"
                            className="rounded"
                          />
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-5 d-flex flex-column justify-content-between">
            <div className="p-4 right-side">
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

              {product.attributes.length > 0 ? (
                <div className="mt-2 pr-3" style={{ textAlign: "justify" }}>
                  <p>
                    <strong>
                      {product.attributes[0].productAttributeResponse.name}
                    </strong>
                    : {product.attributes[0].value}
                  </p>
                </div>
              ) : null}
              <div className="mt-2 pr-3" style={{ textAlign: "justify" }}>
                {/* <p>{product.description}</p> */}
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
            <div className="bottom-panel">
              {product.originalPrice != 0 || product.salePrice != 0 ? (
                <>
                  <div className="prices">
                    <h4 className="text-decoration-line-through">
                      {isSuccess
                        ? toVND(product.originalPrice)
                        : "Original price"}
                    </h4>
                    <h4>
                      {isSuccess ? toVND(product.salePrice) : "Sale price"}
                    </h4>
                  </div>
                </>
              ) : null}

              <div className="buttons d-flex flex-column gap-3">
                <h4 className="card-title text-start text-primary lh-base">
                  Gọi điện trực tiếp:{" "}
                  <a href={`tel:${process.env.REACT_APP_HANOI_ZALO_NUMBER}`}>
                    {formatPhoneNumber(process.env.REACT_APP_HANOI_ZALO_NUMBER)}
                  </a>{" "}
                  <br />
                  hoặc{" "}
                  <a href={`tel:${process.env.REACT_APP_HCM_ZALO_NUMBER}`}>
                    {formatPhoneNumber(process.env.REACT_APP_HCM_ZALO_NUMBER)}
                  </a>
                </h4>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card my-3 p-4">
        <h4 className="ps-2 mb-3">Sản Phẩm Tương Tự</h4>
        <div className="d-flex flex-wrap justify-content-center">
          {productsSuggest ? (
            <>
              {productsSuggest?.map((p) => {
                return <ProductCardMini product={p} />;
              })}
            </>
          ) : (
            <>
              <ProductCardMiniSkeleton />
              <ProductCardMiniSkeleton />
              <ProductCardMiniSkeleton />
              <ProductCardMiniSkeleton />
            </>
          )}
        </div>
      </div>
    </>
  );
}
