export default function Spinner(props) {
  return (
    <>
      <div
        class="d-flex justify-content-center align-items-center"
        style={props.style}
      >
        <div
          class="spinner-border"
          style={{ width: "4.5rem", height: "4.5rem" }}
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}
