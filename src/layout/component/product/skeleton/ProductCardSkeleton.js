import "../css/ProductCardSkeleton.scss";

export default function ProductCardSkeleton() {
  return (
    <>
      <div className="card shadow mx-auto my-1 product-card loading-skeleton">
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
          <div className="card-body">
            <a href="/products/xi-ga-romeo-y-julieta-qqqqq-54">
              <h6
                className="mb-0 card-title cut-title"
                style={{ height: "2.6rem" }}
              >
                product.name
              </h6>
            </a>
          </div>
          <div className="card-body pt-0 d-flex flex-column justify-content-between">
            <h6 className="mb-0 card-title">...</h6>
          </div>
        </div>
      </div>
    </>
  );
}
