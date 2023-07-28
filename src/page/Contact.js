export default function Contact() {
  return (
    <>
      <div className="row g-5 mt-4">
        <div className="col-md-7 m-0">
          <h4 className="mb-3">LIÊN HỆ VỚI CHÚNG TÔI</h4>
          <form className="needs-validation">
            <div className="row g-3">
              <div className="col-12">
                <div class="form-floating">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="fullname"
                  />
                  <label for="floatingInput">Họ và tên</label>
                </div>
              </div>

              <div className="col-12">
                <div class="form-floating">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">
                    Email<span className="text-muted"> (Optional)</span>
                  </label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    style={{ height: "120px" }}
                    onChange={(e) => {
                      e.target.style.height = "";
                      e.target.style.height =
                        Math.max(e.target.scrollHeight, 120) + "px";
                    }}
                  ></textarea>
                  <label>Lời nhắn</label>
                </div>
              </div>

              <hr className="mt-4 mb-0" />

              <button
                className="w-100 btn btn-secondary btn-lg mt-4"
                type="submit"
              >
                Gửi lời nhắn
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-5 m-0">
          <img
            className="w-100 h-100 rounded"
            style={{ objectFit: "cover" }}
            src="https://findycigars.com/cdn/shop/articles/mohd-jon-ramlan-ItGeEBMBurE-unsplash_1_1_1445x.jpg?v=1660258387"
          />
        </div>
      </div>
    </>
  );
}
