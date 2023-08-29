import "./css/ProductCard.css";

import { toVND } from "~/utils/currency";
import { Link } from "react-router-dom";
import { rewriteUrl } from "~/utils/input";
import { useState } from "react";

export default function ProductCard(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="card shadow mx-auto my-1 product-card">
        <Link
          to={`/products/${rewriteUrl(props.product.name)}-${props.product.id}`}
          style={{ color: "unset", position: "relative" }}
        >
          <img
            style={{ height: "150px", objectFit: "cover" }}
            src={
              props.product.productImages[0]?.linkToImage.startsWith("http")
                ? props.product.productImages[0]?.linkToImage
                : "https://en.pimg.jp/042/085/505/1/42085505.jpg"
            }
            alt={`${props.product.name} image`}
            className="card-img-top"
          />
          {props.product.unitsInStock == 0 ? (
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
          <div className="card-body">
            <Link
              to={`/products/${rewriteUrl(props.product.name)}-${
                props.product.id
              }`}
              style={{ color: "unset" }}
            >
              <h6
                className="mb-0 card-title cut-title"
                style={{ height: "2.65rem" }}
              >
                {props.product.name}
              </h6>
            </Link>
          </div>

          <div className="card-body pt-0 d-flex flex-column justify-content-between">
            <h6 className="mb-0 card-title">
              <span className="card-title text-secondary text-decoration-line-through me-2">
                {toVND(props.product.originalPrice)}
              </span>{" "}
              <span className="text-danger">
                {toVND(props.product.salePrice)}
              </span>
            </h6>
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
