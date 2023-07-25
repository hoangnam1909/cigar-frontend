import { numberWithSpaces, toVND } from "~/utils/currency";
import "./css/ProductCard.css";
import { Link } from "react-router-dom";
import { faCartShopping, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductCard(props) {
  return (
    <>
      <div className="card shadow m-2" style={{ width: "19rem" }}>
        <Link to={`/products/${props.product.id}`} style={{ color: "unset" }}>
          <img
            style={{ height: "320px", objectFit: "cover" }}
            src={
              props.product.productImages[0].linkToImage.startsWith("http")
                ? props.product.productImages[0].linkToImage
                : "https://en.pimg.jp/042/085/505/1/42085505.jpg"
            }
            alt={`${props.product.name} image`}
            className="card-img-top"
          />
        </Link>
        <div className="card-body">
          <Link to={`/products/${props.product.id}`} style={{ color: "unset" }}>
            <h5 className="card-title cut-title" style={{ height: "3rem" }}>
              {props.product.name}
            </h5>
          </Link>
          <p className="card-text cut-description">
            {props.product.description}
          </p>
          <h5 className="card-title text-end text-decoration-line-through">
            {toVND(props.product.originalPrice)}
          </h5>
          <h5 className="card-title text-end text-danger">
            {toVND(props.product.salePrice)}
          </h5>
          <div
            className="d-flex justify-content-between"
            role="group"
            aria-label="Basic example"
          >
            <button className="btn btn-outline-secondary me-2">
              <FontAwesomeIcon icon={faCartShopping} className="me-2" />
              Add to cart
            </button>
            <Link
              to={`/products/${props.product.id}`}
              style={{ color: "unset" }}
            >
              <button className="btn btn-outline-secondary">
                <FontAwesomeIcon icon={faEye} className="me-2" />
                View detail
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <Card className="m-2" style={{ width: "18rem" }}>
  //       <Card.Img
  //         variant="top"
  //         style={{ height: "320px", objectFit: "cover" }}
  //         src={
  //           props.product.productImages[0].linkToImage.startsWith("http")
  //             ? props.product.productImages[0].linkToImage
  //             : "https://en.pimg.jp/042/085/505/1/42085505.jpg"
  //         }
  //         alt={`${props.product.name} image`}
  //       />
  //       <Card.Body>
  //         <Card.Title className="text-truncate">
  //           {props.product.name}
  //         </Card.Title>
  //         <Card.Text className="text-decoration-line-through">
  //           {toVND(props.product.originalPrice)}
  //         </Card.Text>
  //         <Card.Text>{toVND(props.product.salePrice)}</Card.Text>
  //       </Card.Body>
  //     </Card>
  //   </>
  // );
}
