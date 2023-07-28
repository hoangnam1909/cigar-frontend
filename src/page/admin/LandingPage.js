import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";

export default function LandingPage() {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <p>{value}</p>
    </>
  );
}
