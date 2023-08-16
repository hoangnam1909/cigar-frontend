import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "react-router-dom";

export default function ArrowPagination(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="pagination">
        <div className="page-text d-flex align-items-center me-3">
          {props.currentPage}/{props.totalPages}
        </div>
        {props.currentPage > 1 ? (
          <>
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => {
                e.preventDefault();
                searchParams.set("page", `${props.currentPage - 1}`);
                setSearchParams(searchParams);
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-light" disabled>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </>
        )}
        {props.currentPage < props.totalPages ? (
          <>
            <button
              type="button"
              className="btn btn-light"
              onClick={(e) => {
                e.preventDefault();
                searchParams.set("page", `${props.currentPage + 1}`);
                setSearchParams(searchParams);
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn-light" disabled>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </>
        )}
      </div>
    </>
  );
}
