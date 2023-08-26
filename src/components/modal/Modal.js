import { useEffect } from "react";
import ModalContent from "./ModalContent";

export default function Modal({
  showModal,
  setShowModal,
  id,
  type,
  title,
  content,
}) {
  useEffect(() => {
    if (showModal == true) {
      document.getElementById(`modal-show-button-${id}`).click();
      console.log("click", id);
    }
  }, [showModal]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        id={`modal-show-button-${id}`}
        data-bs-toggle="modal"
        data-bs-target={`#modal-${id}`}
      >
        Launch static backdrop modal
      </button>

      <div
        className={`modal fade modal-${id}`}
        id={`modal-${id}`}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <ModalContent type={type} content={content} />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Đóng
              </button>
              {/* <button type="button" className="btn btn-primary">
                Understood
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  //     <div
  //       className={`modal fade ${showHideClassName}`}
  //       id="staticBackdrop"
  //       data-bs-backdrop="static"
  //       data-bs-keyboard="false"
  //       tabindex="-1"
  //       aria-labelledby="staticBackdropLabel"
  //       aria-hidden="true"
  //     >
  //       <div className="modal-dialog">
  //         <div className="modal-content">
  //           <div className="modal-header">
  //             <h1 className="modal-title fs-5" id="staticBackdropLabel">
  //               {modalTitle}
  //             </h1>
  //             <button
  //               type="button"
  //               className="btn-close"
  //               data-bs-dismiss="modal"
  //               aria-label="Close"
  //             ></button>
  //           </div>
  //           <div className="modal-body">{modalContent}</div>
  //           <div className="modal-footer">
  //             <button
  //               type="button"
  //               className="btn btn-secondary"
  //               data-bs-dismiss="modal"
  //               onClick={handleClose}
  //             >
  //               Close
  //             </button>
  //             <button type="button" className="btn btn-primary">
  //               Understood
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
}
