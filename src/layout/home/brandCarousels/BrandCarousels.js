import { useState } from "react";
import { Carousel } from "react-bootstrap";

export default function BrandCarousels() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval="3000"
      style={{ width: "100%" }}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://theme.hstatic.net/200000030968/1000527733/14/slideshow_1.png?v=140"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://theme.hstatic.net/200000030968/1000527733/14/slideshow_2.png?v=140"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
