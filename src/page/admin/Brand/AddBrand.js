import { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";
import RichTextEditor from "~/components/Input/RichTextEditor";

export default function AddBrand() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [brand, setBrand] = useState({
    name: "",
  });

  const initialValue = () => {
    setBrand({
      name: "",
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(brand);

    const res = await AuthAPI().post(endpoints.brands, brand);
    if (res.status === 200) {
      setIsSuccess(true);
      initialValue();
    }
  };

  return (
    <>
      <h2 className="my-3">Thêm thương hiệu mới</h2>

      {isSuccess ? (
        <div className="alert alert-success" role="alert">
          Thêm thương hiệu thành công!
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

            <Button variant="dark" className="w-100 my-2" type="submit">
              Xác nhận
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
