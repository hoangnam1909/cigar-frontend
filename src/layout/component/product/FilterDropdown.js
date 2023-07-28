import { useSearchParams } from "react-router-dom";

export default function FilterDropdown(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <select
        className={`form-select ${props.className}`}
        aria-label="filter-drop-down"
        onChange={(e) => {
          if (e.target.value != "none") {
            searchParams.set(`${props.filterObj.filterKey}`, e.target.value);
            setSearchParams(searchParams);
          } else {
            searchParams.delete("sort");
            setSearchParams(searchParams);
          }
        }}
      >
        <option value={"none"}>Sắp xếp theo</option>
        {props.filterObj.filterList?.map((filter, index) => {
          return (
            <option key={index} value={filter.value}>
              {filter.name}
            </option>
          );
        })}
      </select>
    </>
  );
}
