import "../css/ProductCard.css";

export default function ProductCardMiniSkeleton() {
  return (
    <>
      <div class="card shadow m-2 loading-skeleton" style={{ width: "232px" }}>
        <a href="/products/38" style={{ color: "unset", position: "relative" }}>
          <img
            src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509119798_d498b614fa096e178f5c78b932c32aaa.jpg"
            alt="Xì gà Romeo Y Julieta qqqqq image"
            class="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </a>

        <div class="d-flex flex-column h-100">
          <div class="card-body">
            <a href="/products/38">
              <h5 class="card-title cut-title" style={{ height: "3rem" }}>
                Xì gà Romeo Y Julieta qqqqq
              </h5>
            </a>
          </div>
          <div class="card-body pt-0 d-flex flex-column justify-content-between">
            <a class="text-center" href="/products/38">
              <button class="btn btn-outline-secondary w-100">
                Xem chi tiết
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
