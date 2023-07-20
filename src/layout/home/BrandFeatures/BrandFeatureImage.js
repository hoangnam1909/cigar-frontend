import { Image } from "react-bootstrap";

export default function BrandFeatureImage(props) {
  return (
    <>
      <Image
        style={{
          width: "120px",
          height: "120px",
          objectFit: "scale-down",
          margin: "0 30px",
        }}
        src={props.brand.image}
        alt={`${props.brand.image} image`}
      />
    </>
  );
}
