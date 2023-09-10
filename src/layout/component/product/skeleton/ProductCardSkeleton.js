import "../css/ProductCardSkeleton.scss";

export default function ProductCardSkeleton({ className }) {
  return (
    <>
      <div
        className={`card mx-auto my-1 product-card loading-skeleton ${
          className ? className : ""
        }`}
      >
        <a
          href="/products/xi-ga-romeo-y-julieta-qqqqq-54"
          style={{ color: "unset", position: "relative" }}
        >
          <img
            src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509119798_d498b614fa096e178f5c78b932c32aaa.jpg"
            alt="product.image"
            className="card-img-top"
            style={{ height: "150px", objectFit: "cover" }}
          />
        </a>
        <div className="d-flex flex-column h-100">
          <div className="card-body pb-2">
            <a href="/products/xi-ga-romeo-y-julieta-qqqqq-54">
              <h3
                className="mb-0 card-title cut-title"
                style={{ height: "2.52rem", fontSize: "14px" }}
              >
                product.name
              </h3>
            </a>
          </div>
          <div className="card-body pt-0 d-flex flex-column justify-content-between">
            <h6 className="mb-0 card-title text-decoration-line-through text-end">
              ...
            </h6>
            <h5 className="mb-0 card-title text-end">...</h5>
          </div>
        </div>
      </div>
    </>
  );
}
