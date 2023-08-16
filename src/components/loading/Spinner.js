export default function Spinner(props) {
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={props.style}
      >
        <div
          className="spinner-border"
          style={{ width: "4.5rem", height: "4.5rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
