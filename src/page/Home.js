import { useState } from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import API, { endpoints } from "~/config/API";
import BrandCarousels from "~/layout/home/BrandCarousels/BrandCarousels";
import BrandFeatures from "~/layout/home/BrandFeatures/BrandFeatures";
import ProductsView from "~/layout/product/ProductsView";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      await API.get(endpoints.products, {
        params: {
          page: "1",
          // size: "8",
        },
      }).then((res) => {
        setProducts(res.data.result.content);
      });
    }

    fetchProducts();
  }, []);

  return (
    <>
      <BrandCarousels />

      <BrandFeatures />

      <h2 className="text-center mt-4">SẢN PHẨM NỔI BẬT</h2>

      <Container className="mt-4">
        <ProductsView products={products} />
      </Container>
    </>
  );
}
