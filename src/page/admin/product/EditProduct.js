import { useEffect, useState } from "react";
import { Button, Card, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import { ImagesUpload } from "~/components/input/ImagesUpload";
import RichTextEditor from "~/components/input/RichTextEditor";
import ListImagePreview from "~/layout/component/img/ListImagePreview";
import { numberInputOnly } from "~/utils/input";

export default function EditProduct() {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    id: productId,
    name: "",
    description: "",
    originalPrice: "",
    salePrice: "",
    unitsInStock: "",
    categoryId: 0,
    brandId: 0,
    productImages: [],
  });

  const [categoryId, setCategoryId] = useState(0);
  const [brandId, setBrandId] = useState(0);
  const [images, setImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();

    setProduct([...product, images]);
    console.log("request body", product);
  };

  const handleQuillEdit = (value) => {
    setProduct((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };

  useEffect(() => {
    async function getProduct() {
      await API()
        .get(endpoints.products + `/${productId}`)
        .then((response) => {
          console.log(response);
          if (response?.status === 200) {
            setProduct({
              ...product,
              name: response?.data.result.name
                ? response?.data.result.name
                : "",
              description: response?.data.result.description
                ? response?.data.result.description
                : "",
              originalPrice: response?.data.result.originalPrice
                ? response?.data.result.originalPrice
                : "",
              salePrice: response?.data.result.salePrice
                ? response?.data.result.salePrice
                : "",
              unitsInStock: response?.data.result.unitsInStock
                ? response?.data.result.unitsInStock
                : "",
              categoryId: response?.data.result.categoryId
                ? response?.data.result.categoryId
                : "",
              brandId: response?.data.result.brandId
                ? response?.data.result.brandId
                : "",
              productImages: response?.data.result.productImages
                ? response?.data.result.productImages
                : "",
            });
            setImages(
              response?.data.result.productImages.map((img) => img.linkToImage)
            );
          }
        });
    }

    async function getCategories() {
      await API()
        .get(endpoints.categories)
        .then((res) => {
          setCategories(res.data.result);
        });
    }

    async function getBrands() {
      await API()
        .get(endpoints.brands)
        .then((res) => {
          setBrands(res.data.result);
        });
    }

    getCategories();
    getBrands();
    getProduct();
  }, []);

  console.log("image", images);

  return (
    <>
      <h2 className="mt-3">Chỉnh sửa thông tin sản phẩm</h2>

      <Card className="my-3">
        <Card.Body>
          <Form onSubmit={handleSubmitForm}>
            <FloatingLabel
              className="mb-3"
              controlId="floatingSelect"
              label="Phân loại sản phẩm"
              onChange={(e) =>
                setProduct({ ...product, categoryId: e.target.value })
              }
            >
              <Form.Select value={product?.category?.id}>
                {categories?.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </Form.Select>
            </FloatingLabel>

            <FloatingLabel
              className="mb-3"
              controlId="floatingSelect"
              label="Thương hiệu"
              onChange={(e) =>
                setProduct({ ...product, brandId: e.target.value })
              }
            >
              <Form.Select value={product?.brand?.id}>
                {brands?.map((b) => {
                  return (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  );
                })}
              </Form.Select>
            </FloatingLabel>

            <Form.Group className="mb-3">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                id="name-input"
                type="text"
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                value={product?.name}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả sản phẩm</Form.Label>
              <RichTextEditor
                data={product?.description}
                onChange={handleQuillEdit}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá gốc</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Giá gốc"
                  aria-label="Giá gốc"
                  aria-describedby="basic-addon2"
                  pattern="^[0-9]*$"
                  value={product?.originalPrice}
                  onChange={(e) => {
                    if (numberInputOnly(e.target.value)) {
                      setProduct({
                        ...product,
                        originalPrice: e.target.value,
                      });
                    }
                  }}
                />
                <InputGroup.Text id="basic-addon2">VND</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá sau khuyến mại</Form.Label>
              <InputGroup>
                <Form.Control
                  placeholder="Giá sau khuyến mại"
                  aria-label="Giá sau khuyến mại"
                  aria-describedby="basic-addon2"
                  value={product?.salePrice}
                  onChange={(e) => {
                    if (numberInputOnly(e.target.value)) {
                      setProduct({
                        ...product,
                        salePrice: e.target.value,
                      });
                    }
                  }}
                />
                <InputGroup.Text id="basic-addon2">VND</InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                value={product?.unitsInStock}
                onChange={(e) => {
                  if (numberInputOnly(e.target.value)) {
                    setProduct({
                      ...product,
                      unitsInStock: e.target.value,
                    });
                  }
                }}
              />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <ImagesUpload images={images} setImages={setImages} />
              <ListImagePreview imageList={images} />
            </Form.Group>

            <Button variant="dark" className="w-100 my-2" type="submit">
              Lưu các thay đổi
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}
