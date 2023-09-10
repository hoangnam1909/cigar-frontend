import "../css/ProductDetail.css";

export default function ProductDetailSkeleton() {
  return (
    <>
      <div className="card my-3 loading-skeleton">
        <div className="row g-0">
          <div className="col-md border-end">
            <div className="d-flex flex-column h-100">
              <div className="main_image p-3 pb-1">
                <img
                  src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509119798_d498b614fa096e178f5c78b932c32aaa.jpg"
                  id="main_product_image"
                  width="100%"
                  height="420"
                  alt="main_product_image"
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                />
              </div>
              <div className="w-100 px-3 pt-2 pb-3">
                <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
                  <div className="m-1">
                    <img
                      src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509119798_d498b614fa096e178f5c78b932c32aaa.jpg"
                      width="80"
                      height="80"
                      alt="thumbnail_image"
                      className="thumbnail-image rounded object-fit-cover"
                    />
                  </div>
                  <div className="m-1">
                    <img
                      src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509121298_214a8cbe7a988f98dc7177f590932f5e.jpg"
                      width="80"
                      height="80"
                      alt="thumbnail_image"
                      className="thumbnail-image rounded object-fit-cover"
                    />
                  </div>
                  <div className="m-1">
                    <img
                      src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509128681_4c58faa56da5777c216feb501f8747b2.jpg"
                      width="80"
                      height="80"
                      alt="thumbnail_image"
                      className="thumbnail-image rounded object-fit-cover"
                    />
                  </div>
                  <div className="m-1">
                    <img
                      src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509129038_a5c5a7822b4bbe058cec12b1f52ae2a7.jpg"
                      width="80"
                      height="80"
                      alt="thumbnail_image"
                      className="thumbnail-image rounded object-fit-cover"
                    />
                  </div>
                  <div className="m-1">
                    <img
                      src="https://cigarhalong.com/wp-content/uploads/2023/05/z4312509131146_0e9725ab54f90ba34c7ddf83504829a6.jpg"
                      width="80"
                      height="80"
                      alt="thumbnail_image"
                      className="thumbnail-image rounded object-fit-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-between">
            <div className="p-3 right-side">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="w-100">...</h3>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-6 badge my-1">..................</p>
              </div>
              <div className="mt-2 pr-3" style={{ textAlign: "justify" }}>
                <p style={{ height: "290px" }}>des</p>
              </div>
            </div>
            <div className="bottom-panel px-3 pb-4">
              <div className="d-flex flex-column gap-3">
                <h5 className="card-title text-start lh-base mb-0">
                  Gọi điện trực tiếp:
                  <br />
                  <a href="tel:0328594647">0328 594 647</a> hoặc{" "}
                  <a href="tel:0988873547">0988 873 547</a>
                </h5>
                <div className="btn-group group w-100" role="group">
                  <button
                    type="button"
                    className="btn btn-primary rounded-3"
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
                <button className="btn btn-outline-secondary w-100">
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
