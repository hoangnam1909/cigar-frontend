import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ModalContent({ type, content }) {
  if (type == "product") {
    return (
      <>
        <h5 className="text-center mb-3" style={{ color: "#46a74e" }}>
          <FontAwesomeIcon icon={faCheck} /> Thêm sản phẩm vào giỏ hàng thành
          công
        </h5>
        <div className="d-flex flex-wrap">
          <div className="modal-product-image me-3">
            <img
              src={content?.productImages[0]?.linkToImage}
              width="80"
              height="80"
              className="rounded object-fit-cover"
            />
          </div>
          <div className="modal-product-info mt-xs-3">
            <h6>{content?.name}</h6>
            <h6>Số lượng: 1</h6>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>product ne</h1>
    </>
  );
}
