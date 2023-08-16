import { useEffect, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";
import RichTextEditor from "~/components/Input/RichTextEditor";

export default function AddCategory() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [category, setCategory] = useState({
    name: "",
  });

  const initialValue = () => {
    setCategory({
      name: "",
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(category);

    const res = await AuthAPI().post(endpoints.categories, category);
    if (res.status === 200) {
      setIsSuccess(true);
      initialValue();
    }
  };

  return (
    <>
      <h2 className="my-3">Thêm danh mục</h2>

      {isSuccess ? (
        <div className="alert alert-success" role="alert">
          Thêm danh mục thành công!
        </div>
      ) : null}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmitForm}>
            <Form.Group className="mb-3">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                id="name-input"
                type="text"
                onChange={(e) =>
                  setCategory((category) => {
                    return { ...category, name: e.target.value };
                  })
                }
                value={category.name}
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
