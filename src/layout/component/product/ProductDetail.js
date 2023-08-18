import "./css/ProductDetail.css";

import { useParams } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import useAxios from "~/utils/useAxios";
import { toVND } from "~/utils/currency";
import { ZaloIcon } from "../../../assets/img/ZaloIcon";
import { formatPhoneNumber } from "~/utils/phoneNumber";
import ProductDetailSkeleton from "./skeleton/ProductDetailSkeleton";
import { useEffect, useState } from "react";
import ProductCardMini from "./ProductCardMini";

export default function ProductDetail() {
  const { productId } = useParams();
  const [productsSuggest, setProductsSuggest] = useState();
  const [result, { isLoading, isSuccess, isError, error }] = useAxios({
    url: endpoints.products.concat(`/${productId}`),
    method: "get",
  });

  useEffect(() => {
    async function getSuggestProducts() {
      const res = await API().get(`${endpoints.productsSuggest}/${productId}`);
      if (res.status === 200) {
        setProductsSuggest(res.data.result);
      }
    }

    getSuggestProducts();
  }, []);

  function changeProductImage(link) {
    if (isSuccess) {
      document.getElementById("main_product_image").src = link;
    }
  }

  if (!isSuccess || result.result == null) {
    return <ProductDetailSkeleton />;
  }

  document.title = result?.result.name;

  return (
    <>
      <div className="card my-3">
        <div className="row g-0">
          <div className="col-md-7 border-end">
            <div className="d-flex flex-column justify-content-center">
              <div className="main_image p-4">
                <img
                  src={result.result.productImages[0]?.linkToImage}
                  id="main_product_image"
                  height="450"
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                  alt="main_product_image"
                />
              </div>
              <div className="thumbnail_images">
                <ul id="thumbnail">
                  {result.result.productImages.map((image) => {
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
                <h3>{result.result.name}</h3>
              </div>

              {result.result.unitsInStock == 0 ? (
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

              {result.result.attributes.length > 0 ? (
                <div className="mt-2 pr-3" style={{ textAlign: "justify" }}>
                  <p>
                    <strong>
                      {
                        result.result.attributes[0].productAttributeResponse
                          .name
                      }
                    </strong>
                    : {result.result.attributes[0].value}
                  </p>
                </div>
              ) : null}
              <div className="mt-2 pr-3" style={{ textAlign: "justify" }}>
                {/* <p>{result.result.description}</p> */}
                {result.result.description ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: result.result.description,
                    }}
                  />
                ) : (
                  "Mô tả sản phẩm"
                )}
              </div>
            </div>
            <div className="bottom-panel">
              {result.result.originalPrice != 0 ||
              result.result.salePrice != 0 ? (
                <>
                  <div className="prices">
                    <h4 className="text-decoration-line-through">
                      {isSuccess
                        ? toVND(result.result.originalPrice)
                        : "Original price"}
                    </h4>
                    <h4>
                      {isSuccess
                        ? toVND(result.result.salePrice)
                        : "Sale price"}
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
        <h4 className="ps-2">Sản Phẩm Tương Tự</h4>
        <div className="d-flex flex-wrap justify-content-center">
          {productsSuggest?.map((p) => {
            return <ProductCardMini product={p} />;
          })}
        </div>
      </div>
    </>
  );
}
