import axios from "axios";
import { Form } from "react-bootstrap";

export const ImagesUpload = ({ setImages }) => {
  const handleChooseImage = (e) => {
    setImages([]);

    Array.from(e.target.files).forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
      formData.append("timestamp", (Date.now() / 1000) | 0);

      const response = await axios.post(
        process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );
      const data = response.data;
      const fileURL = data.secure_url;
      setImages((images) => [...images, fileURL]);
    });
  };

  return (
    <>
      <Form.Label>Ảnh sản phẩm</Form.Label>
      <Form.Control
        className="mb-3"
        type="file"
        multiple
        onChange={handleChooseImage}
      />
    </>
  );
};
