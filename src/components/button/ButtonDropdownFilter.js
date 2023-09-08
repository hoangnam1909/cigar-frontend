import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function ButtonDropdownFilter({
  objectList,
  filterName,
  filterKey,
  valueField,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayValue, setDisplayValue] = useState(filterName);

  useEffect(() => {
    if (searchParams.get(filterKey) == null) setDisplayValue(filterName);
  }, [searchParams]);

  return (
    <div className="btn-group" role="group">
      <a
        className="btn btn-light dropdown-toggle px-4"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {displayValue}
      </a>
      <ul
        className="dropdown-menu overflow-y-auto"
        style={{ maxHeight: "300px" }}
      >
        {objectList?.map((object, index) => {
          return (
            <li key={index}>
              <a
                className="dropdown-item"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  searchParams.set(`${filterKey}`, `${object[valueField]}`);
                  setSearchParams(searchParams);
                  setDisplayValue(object.name);
                }}
              >
                {object.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
