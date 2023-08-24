import { useEffect, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";

export default function EditCategory() {
  const { categoryId } = useParams();
  const [isSuccess, setIsSuccess] = useState(false);
  const [category, setCategory] = useState({
    name: "",
  });

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await AuthAPI().put(
      `${endpoints.categories}/${categoryId}`,
      category
    );
    if (res.status === 200) {
      setIsSuccess(true);
    }
  };

  useEffect(() => {
    async function getCategory() {
      const res = await API().get(`${endpoints.categories}/${categoryId}`);
      if (res.status === 200) {
        setCategory((category) => {
          return { ...category, name: res.data.result.name };
        });
      }
    }

    getCategory();
  }, []);

  return (
    <>
      <h2 className="my-3">Sửa danh mục</h2>

      {isSuccess ? (
        <div className="alert alert-success" role="alert">
          Sửa thông tin danh mục thành công!
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
