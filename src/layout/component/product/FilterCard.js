import { useSearchParams } from "react-router-dom";

export const FilterCard = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  if (props.type == "select") {
    return (
      <>
        <div id="categories-card" className="card mb-3">
          <div className="card-header">
            <h6 className="card-title m-0">{props.filterName}</h6>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {props.filterList?.map((obj) => {
                if (searchParams.get(`${props.filterKey}`) == obj.id) {
                  return (
                    <li
                      key={obj.id}
                      className="list-group-item text-light bg-secondary d-flex justify-content-between align-items-center"
                      onClick={() => {
                        searchParams.set(`${props.filterKey}`, `${obj.id}`);
                        setSearchParams(searchParams);
                      }}
                    >
                      {obj.name}
                    </li>
                  );
                }
                return (
                  <li
                    key={obj.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                    onClick={() => {
                      searchParams.set(`${props.filterKey}`, `${obj.id}`);
                      setSearchParams(searchParams);
                    }}
                  >
                    {obj.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  } else if (props.type == "text") {
    return (
      <>
        <div id="categories-card" className="card mb-3">
          <div className="card-header">
            <h6 className="card-title m-0">{props.filterName}</h6>
          </div>
          <div className="card-body">
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setTimeout(function () {
                  searchParams.delete("page");
                  if (e.target.value.length == 0) {
                    searchParams.delete(`${props.filterKey}`);
                    setSearchParams(searchParams);
                  } else {
                    searchParams.set(`${props.filterKey}`, `${e.target.value}`);
                    setSearchParams(searchParams);
                  }
                }, 500);
              }}
            />
          </div>
        </div>
      </>
    );
  }
};
