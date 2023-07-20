import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import API, { endpoints } from "~/config/API";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      await API.get(endpoints.products, {
        params: {
          page: "1",
          size: "8",
        },
      }).then((res) => {
        setProducts(res.data.result.content);
      });
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Container>
        <div className="d-flex flex-wrap flex-grow-2 justify-content-center">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </>
  );
}
