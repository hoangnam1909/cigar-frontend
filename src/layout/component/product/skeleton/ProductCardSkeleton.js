import "../css/ProductCardSkeleton.scss";

export default function ProductCardSkeleton() {
  return (
    <>
      <div className="card shadow mx-auto my-2 product-card loading-skeleton">
        <a href="/products/54" style={{ color: "unset", position: "relative" }}>
          <img
            src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509119798_d498b614fa096e178f5c78b932c32aaa.jpg"
            alt="Xì gà Romeo Y Julieta qqqqq image"
            className="card-img-top"
            style={{ height: "320px", objectFit: "cover" }}
          />
        </a>
        <div className="d-flex flex-column h-100">
          <div className="card-body">
            <a href="/products/54">
              <h5 className="card-title cut-title" style={{ height: "3rem" }}>
                Xì gà Romeo Y Julieta qqqqq
              </h5>
            </a>
          </div>
          <div className="card-body pt-0 d-flex flex-column justify-content-between">
            <h5 className="card-title mb-3">Liên hệ qua Zalo</h5>
            <h5 className="card-title text-end text-danger text-center mb-2">
              <div className="w-100">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Zalo
                </button>
                <ul className="dropdown-menu w-100">
                  <li>
                    <a
                      className="dropdown-item"
                      target="_blank"
                      rel="noreferrer"
                      href="https://zalo.me/0328594647"
                    >
                      Hà Nội
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      target="_blank"
                      rel="noreferrer"
                      href="https://zalo.me/0988873547"
                    >
                      Thành phố Hồ Chí Minh
                    </a>
                  </li>
                </ul>
              </div>
            </h5>
            <button className="btn btn-outline-secondary w-100">
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
