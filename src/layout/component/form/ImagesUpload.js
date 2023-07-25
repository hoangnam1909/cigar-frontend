import { useEffect } from "react";
import { useState } from "react";
import { Form, Image } from "react-bootstrap";

export const ImagesUpload = ({ setData, setImages }) => {
  const [productImagesLink, setProductImagesLink] = useState([]);

  const handleChooseImage = (e) => {
    setProductImagesLink([]);

    Array.from(e.target.files).forEach((file) => {
      setProductImagesLink((productImagesLink) => [
        ...productImagesLink,
        URL.createObjectURL(file),
      ]);
    });

    setData(e.target.files);
  };

  useEffect(() => {
    setImages(productImagesLink);
  }, [productImagesLink]);

  return (
    <>
      <Form.Label>Ảnh sản phẩm</Form.Label>
      <Form.Control
        className="mb-3"
        type="file"
        multiple
        onChange={handleChooseImage}
      />
      {productImagesLink?.map((link, index) => {
        return (
          <Image
            key={index}
            src={link}
            style={{ height: "200px", objectFit: "cover" }}
            fluid
            rounded
            className="me-2 mb-2 border"
          />
        );
      })}
    </>
  );
};
