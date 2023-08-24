import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

export default function OrderSuccessful(props) {
  const order = props.order;

  return (
    <>
      <div className="card px-4 py-4 mt-3 mx-auto d-flex align-items-center">
        <div className="d-flex flex-column my-3 border-bottom w-100">
          <FontAwesomeIcon
            icon={faCircleCheck}
            style={{ color: "#58a624", height: "80px" }}
            className="mb-4"
          />

          <h5 className="" style={{ color: "#58a624", textAlign: "center" }}>
            Mua hàng thành công
          </h5>
          <p className="text-center mb-0">
            Mã đơn hàng: <b>#{order.id}</b>
          </p>
          <p className="text-center">
            Ngày tạo đơn:{" "}
            <b>
              {moment(order.createdAt).format("LTS")}
              {" - "}
              {moment(order.createdAt).format("LL")}
            </b>
          </p>
        </div>

        <div className="text-center w-75">
          <h6>Cảm ơn bạn đã mua sắm tại website CigarForBoss.com</h6>
          <p>
            Bạn đã đặt hàng thành công. Để kiểm tra tất cả chi tiết về đơn hàng,
            vui lòng liên hệ với nhân viên cửa hàng hoặc kiểm tra email xác nhận
            đơn hàng.
          </p>
        </div>

        <Link to="/products" className="btn btn-outline-success w-75 mt-2 mb-3">
          TIẾP TỤC MUA HÀNG
        </Link>
      </div>
    </>
  );
}
