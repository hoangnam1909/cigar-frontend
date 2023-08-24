import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";

export default function EditBrand() {
  const { brandId } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [brand, setBrand] = useState({
    name: "",
    country: "",
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await AuthAPI().put(`${endpoints.brands}/${brandId}`, brand);
    if (res.status === 200) {
      setIsSuccess(true);
    }
  };

  useEffect(() => {
    async function getBrand() {
      const res = await API().get(`${endpoints.brands}/${brandId}`);
      if (res.status === 200) {
        setBrand((brand) => {
          return {
            ...brand,
            name: res.data.result.name,
            country: res.data.result.country,
          };
        });
      }
    }

    getBrand();
  }, []);

  return (
    <>
      <h2 className="my-3">Sửa thông tin thương hiệu</h2>

      {isSuccess ? (
        <div className="alert alert-success" role="alert">
          Sửa thông tin thương hiệu thành công!
        </div>
      ) : null}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmitForm}>
            <Form.Group className="mb-3">
              <Form.Label>Tên thương hiệu</Form.Label>
              <Form.Control
                id="name-input"
                type="text"
                onChange={(e) =>
                  setBrand((brand) => {
                    return { ...brand, name: e.target.value };
                  })
                }
                value={brand.name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quốc gia</Form.Label>
              <Form.Control
                id="name-input"
                type="text"
                onChange={(e) =>
                  setBrand((brand) => {
                    return { ...brand, country: e.target.value };
                  })
                }
                value={brand.country}
              />
            </Form.Group>

            <Button variant="dark" className="w-100 my-2" type="submit">
              Xác nhận
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
