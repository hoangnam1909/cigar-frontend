import { Image } from "react-bootstrap";

export default function ListImagePreview({ imageList }) {
  return (
    <>
      <div className="d-flex">
        {imageList?.map((image, index) => {
          return (
            <Image
              key={index}
              src={image}
              style={{ height: "200px", objectFit: "cover" }}
              fluid
              rounded
              className="me-2 border"
            />
          );
        })}
      </div>
    </>
  );
}
