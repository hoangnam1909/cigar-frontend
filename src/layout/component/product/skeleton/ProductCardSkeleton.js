import "../css/ProductCardSkeleton.scss";

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
            <h5 className="card-title cut-title" style={{ height: "3rem" }}>
              Xì Gà Hoàng Nam
            </h5>
          </div>

          <div class="card-body pt-0 d-flex flex-column justify-content-between">
            <h5 class="card-title mb-3">Liên hệ qua Zalo</h5>
            <h5 class="card-title text-end text-danger text-center mb-2">
              <div class="w-100">
                <button
                  type="button"
                  class="btn btn-primary w-100"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Zalo
                </button>
                <ul class="dropdown-menu w-100">
                  <li>
                    <a
                      class="dropdown-item"
                      target="_blank"
                      rel="noreferrer"
                      href="https://zalo.me/0328594647"
                    >
                      Hà Nội
                    </a>
                  </li>
                  <li>
                    <a
                      class="dropdown-item"
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
            <a class="text-center">
              <button class="btn btn-outline-secondary w-100">
                Xem chi tiết
              </button>
            </a>
          </div>

          {/* <div className="card-body">
            <h5
              className="card-text rounded-3 cut-description"
              style={{ height: "3rem" }}
            >
              product name
            </h5>
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
          </div> */}
        </div>
      </div>
    </>
  );
}
