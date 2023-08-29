export default function SpecifyCard({ spec }) {
  return (
    <>
      <div className="card shadow mx-auto my-2 p-0 h-100">
        <div className="d-flex flex-column flex-wrap">
          <img
            src={spec.image}
            className="img-fluid"
            alt="..."
            style={{ height: "200px", objectFit: "cover" }}
          />
          <div className="card-body">
            <h5 className="card-title">{spec.name}</h5>
            <p className="card-text">{spec.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
