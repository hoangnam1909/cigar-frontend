import "../css/ProductCard.css";

export default function ProductCardMiniSkeleton() {
  return (
    <>
      <div
        className="card shadow m-2 loading-skeleton"
        style={{ width: "232px" }}
      >
        <a href="/products/38" style={{ color: "unset", position: "relative" }}>
          <img
            src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509119798_d498b614fa096e178f5c78b932c32aaa.jpg"
            alt="Xì gà Romeo Y Julieta qqqqq image"
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </a>

        <div className="d-flex flex-column h-100">
          <div className="card-body">
            <a href="/products/38">
              <h5 className="card-title cut-title" style={{ height: "3rem" }}>
                Xì gà Romeo Y Julieta qqqqq
              </h5>
            </a>
          </div>
          <div className="card-body pt-0 d-flex flex-column justify-content-between">
            <a className="text-center" href="/products/38">
              <button className="btn btn-outline-secondary w-100">
                Xem chi tiết
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
