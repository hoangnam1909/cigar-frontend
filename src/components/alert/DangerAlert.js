export default function DangerAlert(props) {
  return (
    <>
      <div className="alert alert-danger" role="alert">
        {props.message}
      </div>
    </>
  );
}
