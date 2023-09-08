import "./css/ProductCard.css";

import { toVND } from "~/utils/currency";
import { Link } from "react-router-dom";
import { rewriteUrl } from "~/utils/input";
import { useState } from "react";

export default function ProductCard({ product, className }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className={`card mx-auto my-1 product-card ${
          className ? className : ""
        }`}
        onClick={() => {
          return (
            <Link
              to={`/products/${rewriteUrl(product.name)}-${product.id}`}
              replace
            />
          );
        }}
      >
        <Link to={`/products/${rewriteUrl(product.name)}-${product.id}`}>
          <img
            style={{ height: "150px", objectFit: "cover" }}
            src={
              product.productImages[0]?.linkToImage.startsWith("http")
                ? product.productImages[0]?.linkToImage
                : "https://en.pimg.jp/042/085/505/1/42085505.jpg"
            }
            alt={`${product.name} image`}
            className="card-img-top"
          />
          {product.unitsInStock == 0 ? (
            <>
              <span
                className="badge bg-danger"
                style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  fontSize: "15px",
                }}
              >
                Hết hàng
              </span>
            </>
          ) : null}
        </Link>

        <div className="d-flex flex-column h-100">
          <div className="card-body pb-2">
            <Link
              to={`/products/${rewriteUrl(product.name)}-${product.id}`}
              style={{ color: "unset" }}
            >
              <h6
                className="mb-0 card-title cut-title"
                style={{ height: "2.4rem" }}
              >
                {product.name}
              </h6>
            </Link>
          </div>

          <div className="card-body pt-0 d-flex flex-column justify-content-between">
            {product.originalPrice == 0 || product.salePrice == 0 ? (
              <>
                <h6 className="mb-0 card-title text-secondary text-decoration-line-through opacity-0 text-end">
                  abcd
                </h6>

                <h5 className="mb-0 card-title text-danger text-end">
                  Liên hệ
                </h5>
              </>
            ) : (
              <>
                <h6 className="mb-0 card-title text-secondary text-decoration-line-through text-end">
                  {toVND(product.originalPrice)}
                </h6>

                <h5 className="mb-0 card-title text-danger text-end">
                  {toVND(product.salePrice)}
                </h5>
              </>
            )}
          </div>
        </div>
      </div>

      {/* <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        id={props?.product?.id}
        type={"product"}
        title={"Thêm sản phẩm vào giỏ hàng thành công"}
        content={props?.product}
      /> */}
    </>
  );
}
