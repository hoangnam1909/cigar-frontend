import { Container } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import API, { endpoints } from "~/config/API";
import BrandFeatureImage from "./BrandFeatureImage";

export default function BrandFeatures() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function fetchBrands() {
      await API.get(endpoints.brands).then((res) => {
        setBrands(res.data.result);
      });
    }

    fetchBrands();
  }, []);

  return (
    <>
      <Container>
        <div className="d-flex flex-wrap flex-grow-2 justify-content-center mt-4">
          {brands.map((p) => (
            <BrandFeatureImage key={p.id} brand={p} />
          ))}
        </div>
      </Container>
    </>
  );
}
