import "../css/ProductDetail.css";

export default function ProductDetailSkeleton() {
  return (
    <>
      <div className="card my-3 loading-skeleton">
        <div className="row g-0">
          <div className="col-md-7 border-end">
            <div className="d-flex flex-column justify-content-center">
              <div className="main_image p-4">
                <img
                  src="https://media.istockphoto.com/id/490736131/photo/cigar.jpg?s=612x612&w=0&k=20&c=JtH1CZ-tDzfkisxF0kwFJlHpT-W4cZre1U30s_5jELc="
                  id="main_product_image"
                  height="100%"
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                  alt="main_product_image"
                />
              </div>
              <div className="thumbnail_images">
                <ul id="thumbnail">
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/490736131/photo/cigar.jpg?s=612x612&w=0&k=20&c=JtH1CZ-tDzfkisxF0kwFJlHpT-W4cZre1U30s_5jELc="
                      height="100"
                      alt="thumbnail_image"
                    />
                  </li>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/490736131/photo/cigar.jpg?s=612x612&w=0&k=20&c=JtH1CZ-tDzfkisxF0kwFJlHpT-W4cZre1U30s_5jELc="
                      height="100"
                      alt="thumbnail_image"
                    />
                  </li>
                  <li>
                    <img
                      src="https://media.istockphoto.com/id/490736131/photo/cigar.jpg?s=612x612&w=0&k=20&c=JtH1CZ-tDzfkisxF0kwFJlHpT-W4cZre1U30s_5jELc="
                      height="100"
                      alt="thumbnail_image"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md d-flex flex-column justify-content-between">
            <div className="p-4 right-side">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="w-100">name</h3>
              </div>
              <div className="mt-2 pr-3" style={{ textAlign: "justify" }}>
                <p style={{ height: "290px" }}>des</p>
              </div>
            </div>
            <div className="bottom-panel">
              <div className="buttons d-flex flex-column gap-3">
                <h4>Gọi điện trực tiếp</h4>
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
                        href={`https://zalo.me/${process.env.REACT_APP_HANOI_ZALO_NUMBER}`}
                      >
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
                        Thành phố Hồ Chí Minh
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
