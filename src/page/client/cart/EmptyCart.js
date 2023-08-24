import { Link } from "react-router-dom";

export default function EmptyCart() {
  return (
    <>
      <div className="card px-4 py-5 mt-3 mx-auto d-flex align-items-center">
        <h5 className="mb-4" style={{ textAlign: "center" }}>
          Giỏ hàng của bạn đang trống
        </h5>
        <Link to="/products" className="btn btn-outline-primary w-75">
          TIẾP TỤC MUA HÀNG
        </Link>
      </div>
    </>
  );
}
