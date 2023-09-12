import { useEffect, useState } from "react";
import { Button, Card, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import API, { adminEndpoints, endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";
import { ImagesUpload } from "~/components/input/ImagesUpload";
import RichTextEditor from "~/components/input/RichTextEditor";
import ListImagePreview from "~/layout/component/img/ListImagePreview";
import { numberInputOnly } from "~/utils/input";

export default function ProductEdit() {
  const { productId } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    originalPrice: 0,
    salePrice: 0,
    unitsInStock: 0,
    categoryId: 1,
    brandId: 1,
    productImages: [],
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setProduct({ ...product, productImages: images });

    const res = await AuthAPI().put(
      `${adminEndpoints.products}/${productId}`,
      product
    );
    if (res.status === 200) setIsSuccess(true);
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
          if (response?.status === 200) {
            setImages(
              response?.data.result.productImages.map((img) => img.linkToImage)
            );

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
                : 0,
              salePrice: response?.data.result.salePrice
                ? response?.data.result.salePrice
                : 0,
              unitsInStock: response?.data.result.unitsInStock
                ? response?.data.result.unitsInStock
                : 0,
              categoryId: response?.data.result.category.id
                ? response?.data.result.category.id
                : 0,
              brandId: response?.data.result.brand.id
                ? response?.data.result.brand.id
                : 0,
              productImages: response?.data.result.productImages
                ? response?.data.result.productImages.map(
                    (img) => img.linkToImage
                  )
                : [],
            });
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

  return (
    <>
      <div className="container-fluid mt-3">
        <h3 className="mt-2 mb-4 text-gray-800">
          Chỉnh sửa thông tin sản phẩm
        </h3>

        {isSuccess ? (
          <div className="alert alert-success mb-0" role="alert">
            Sửa thông tin danh mục thành công!
          </div>
        ) : null}

        <Card className="my-3">
          <Card.Body>
            <Form onSubmit={handleSubmitForm}>
              <FloatingLabel
                className="mb-3"
                controlId="floatingSelect"
                label="Phân loại sản phẩm"
                defaultValue={product?.category?.id}
                onChange={(e) =>
                  setProduct({
                    ...product,
                    categoryId: parseInt(e.target.value),
                  })
                }
              >
                <Form.Select>
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
                defaultValue={product?.brand?.id}
                onChange={(e) =>
                  setProduct({ ...product, brandId: parseInt(e.target.value) })
                }
              >
                <Form.Select>
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
                    value={parseInt(
                      product?.originalPrice ? product?.originalPrice : 0
                    )}
                    onChange={(e) => {
                      if (numberInputOnly(e.target.value)) {
                        setProduct({
                          ...product,
                          originalPrice: parseInt(e.target.value),
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
                    value={parseInt(
                      product?.salePrice ? product?.salePrice : 0
                    )}
                    onChange={(e) => {
                      if (numberInputOnly(e.target.value)) {
                        setProduct({
                          ...product,
                          salePrice: parseInt(e.target.value),
                        });
                      }
                    }}
                  />
                  <InputGroup.Text id="basic-addon2">VND</InputGroup.Text>
                </InputGroup>
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Số lượng</Form.Label>
                <Form.Control
                  value={parseInt(
                    product?.unitsInStock ? product?.unitsInStock : 0
                  )}
                  onChange={(e) => {
                    if (numberInputOnly(e.target.value)) {
                      setProduct({
                        ...product,
                        unitsInStock: parseInt(e.target.value),
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
      </div>
    </>
  );
}
