export default function SpecifyCard(props) {
  return (
    <>
      <div className="card m-2 shadow" style={{ width: "400px" }}>
        <div className="row g-0" style={{ height: "100%" }}>
          <div className="col-md-5">
            <img
              src={props.spec.image}
              className="img-fluid"
              alt="..."
              style={{ height: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="col-md">
            <div className="card-body">
              <h5 className="card-title">{props.spec.name}</h5>
              <p className="card-text">{props.spec.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
