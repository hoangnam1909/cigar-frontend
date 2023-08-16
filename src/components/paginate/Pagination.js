import "./css/Pagination.css";
import { useSearchParams } from "react-router-dom";

export default function Pagination(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginate = [];

  for (let i = 1; i <= props.totalPages; i++) {
    if ([props.currentPage] == i) {
      paginate.push(
        <li key={i} className="page-item active">
          <a
            className="page-link"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              console.log(searchParams);
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
        <li key={i} className="page-item">
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
