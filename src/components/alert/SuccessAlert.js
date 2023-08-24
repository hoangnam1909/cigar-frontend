export default function SuccessAlert(props) {
  return (
    <>
      <div className="alert alert-success" role="alert">
        {props.message}
      </div>
    </>
  );
}
