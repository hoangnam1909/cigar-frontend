import "./css/ProductCard.css";

import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rewriteUrl } from "~/utils/input";

export default function ProductCardMini(props) {
  const product = props.product;

  return (
    <>
      <div className="card shadow m-2">
        <Link
          to={`/products/${rewriteUrl(product.name)}-${product.id}`}
          style={{ color: "unset", position: "relative" }}
        >
          <img
            style={{ height: "200px", objectFit: "cover" }}
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
          <div className="card-body">
            <Link
              to={`/products/${rewriteUrl(product.name)}-${product.id}`}
              style={{ color: "unset" }}
            >
              <h5 className="card-title cut-title" style={{ height: "3rem" }}>
                {product.name}
              </h5>
            </Link>
          </div>

          <div className="card-body pt-0 d-flex flex-column justify-content-between">
            <Link
              className="text-center"
              to={`/products/${rewriteUrl(product.name)}-${product.id}`}
              style={{ color: "unset" }}
            >
              <button className="btn btn-outline-secondary w-100">
                <FontAwesomeIcon icon={faEye} className="me-2" />
                Xem chi tiết
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
