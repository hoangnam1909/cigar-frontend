import { Form } from "react-bootstrap";

export const ImagesUpload = ({ setImages, setImageFiles }) => {
  const handleChooseImage = (e) => {
    setImageFiles(e.target.files);
    setImages(
      Array.from(e.target.files).map((image) => {
        return URL.createObjectURL(image);
      })
    );
  };

  return (
    <>
      <label className="mb-2">Ảnh sản phẩm</label>
      <input
        className="form-control mb-3"
        type="file"
        accept=""
        multiple
        onChange={handleChooseImage}
      />
    </>
  );
};
