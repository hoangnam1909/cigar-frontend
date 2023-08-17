import { Image } from "react-bootstrap";

export default function ListImagePreview({ imageList }) {
  return (
    <>
      <div className="d-flex flex-wrap">
        {imageList?.map((image, index) => {
          return (
            <Image
              key={index}
              src={image}
              style={{ height: "200px", objectFit: "cover" }}
              fluid
              rounded
              className="m-1 border"
            />
          );
        })}
      </div>
    </>
  );
}
