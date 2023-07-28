import "./css/ProductCardSkeleton.scss";

export default function ProductCardSkeleton() {
  return (
    <>
      <div className="card shadow m-2 product-card loading-skeleton">
        <div>
          <img
            style={{ objectFit: "cover" }}
            src="//placebear.com/300/200"
            alt="image"
            width={304}
            height={320}
            className="card-img-top"
          />
        </div>
        <div className="d-flex flex-column h-100">
          <div className="card-body">
            <h5
              className="card-text rounded-3 cut-description"
              style={{ height: "4rem" }}
            >
              product name
            </h5>
            <p
              className="card-text rounded-3 cut-description"
              style={{ height: "4.5rem" }}
            >
              bla bla
            </p>
            <h5
              className="card-text rounded-3 cut-description pt-1"
              style={{ height: "1.5rem" }}
            >
              Liên hệ zalo
            </h5>
            <h5
              className="card-title rounded-3 mb-2"
              style={{ height: "3rem" }}
            >
              Zalo
            </h5>
            <button className="btn btn-outline-secondary w-100">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
