import { Card } from "react-bootstrap";
import ToVND from "~/utils/currency";

export default function ProductCard(props) {
  return (
    <>
      <Card className="m-2" style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          style={{ height: "320px", objectFit: "cover" }}
          src={
            props.product.productImages[0].linkToImage.startsWith("http")
              ? props.product.productImages[0].linkToImage
              : "https://en.pimg.jp/042/085/505/1/42085505.jpg"
          }
          alt={`${props.product.name} image`}
        />
        <Card.Body>
          <Card.Title className="text-truncate">
            {props.product.name}
          </Card.Title>
          <Card.Text className="text-decoration-line-through">
            {ToVND(props.product.originalPrice)}
          </Card.Text>
          <Card.Text>{ToVND(props.product.salePrice)}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
