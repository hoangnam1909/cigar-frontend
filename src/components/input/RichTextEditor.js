import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function RichTextEditor({ data, onChange }) {
  return <ReactQuill theme="snow" value={data} onChange={onChange} />;
}
