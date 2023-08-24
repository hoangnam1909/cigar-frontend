import "./css/ProductCard.css";

import { toVND } from "~/utils/currency";
import { Link } from "react-router-dom";
import { faCartShopping, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ZaloIcon } from "../../../assets/img/ZaloIcon";
import { addProductToCart } from "~/service/CartService";
import { rewriteUrl } from "~/utils/input";

export default function ProductCard(props) {
  return (
    <>
      <div className="card shadow mx-auto my-2 product-card">
        <Link
          to={`/products/${rewriteUrl(props.product.name)}-${props.product.id}`}
          style={{ color: "unset", position: "relative" }}
        >
          <img
            style={{ height: "320px", objectFit: "cover" }}
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
              <h5 className="card-title cut-title" style={{ height: "3rem" }}>
                {props.product.name}
              </h5>
            </Link>
          </div>

          <div className="card-body pt-0 d-flex flex-column justify-content-between">
            {props.product.salePrice == 0 || props.product.unitsInStock == 0 ? (
              <>
                <h5 className="card-title text-end text-primary text-center mb-3">
                  Liên hệ qua Zalo
                </h5>
                <h5 className="card-title text-end text-danger text-center mb-2">
                  <div className="w-100">
                    <button
                      type="button"
                      className="btn btn-primary w-100"
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
                </h5>
              </>
            ) : (
              <>
                <h5 className="card-title text-end text-decoration-line-through">
                  {toVND(props.product.originalPrice)}
                </h5>
                <h5 className="card-title text-end text-danger">
                  {toVND(props.product.salePrice)}
                </h5>
              </>
            )}

            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => {
                addProductToCart(props.product);
              }}
            >
              <FontAwesomeIcon icon={faCartShopping} className="me-2" />
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
