import "./css/Pagination.css";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ currentPage, totalPages }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginate = [];

  for (let i = 1; i <= totalPages; i++) {
    if ([currentPage] == i) {
      paginate.push(
        <li key={i} className="page-item active">
          <a
            className="page-link"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              searchParams.set("page", `${i}`);
              setSearchParams(searchParams);
            }}
          >
            {i}
          </a>
        </li>
      );
    } else {
      paginate.push(
        <li key={i} className={`page-item ${i == currentPage ? "active" : ""}`}>
          <a
            className="page-link"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              searchParams.set("page", `${i}`);
              setSearchParams(searchParams);
            }}
          >
            {i}
          </a>
        </li>
      );
    }
  }

  return (
    <ul className="pagination d-flex justify-content-center mb-2">
      {paginate}
    </ul>
  );
}
