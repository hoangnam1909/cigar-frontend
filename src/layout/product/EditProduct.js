import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import API, { endpoints } from "~/config/API";
import { ImagesUpload } from "../component/form/ImagesUpload";
import axios from "axios";
import { toVND, numberWithSpaces } from "~/utils/currency";

export default function EditProduct() {
  console.log("EditProduct ==> re-render");
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [unitsInStock, setUnitsInStock] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [brandId, setBrandId] = useState(0);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    let cloudinaryImagesLink = [];
    Array.from(files).forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `codeinfuse, medium, gist`);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
      formData.append("timestamp", (Date.now() / 1000) | 0);

      const response = await axios.post(
        process.env.REACT_APP_CLOUDINARY_UPLOAD_URL,
        formData,
        {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }
      );
      const data = response.data;
      const fileURL = data.secure_url;
      cloudinaryImagesLink.push(fileURL);
    });

    let requestBody = {
      name: name,
      description: description,
      originalPrice: parseInt(originalPrice),
      salePrice: parseInt(salePrice),
      categoryId: parseInt(categoryId),
      brandId: parseInt(brandId),
      unitsInStock: parseInt(unitsInStock),
      productImagesLink: cloudinaryImagesLink,
    };
    console.log(requestBody);

    // const res = await API.post(endpoints.products, requestBody);
    // if (res.status == 200) {
    //   console.log("success");
    // }
  };

  const handleNumberInputOnly = (e, setData) => {
    const re = /^[0-9]*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setData(e.target.value);
    }
  };

  useEffect(() => {
    async function getCategories() {
      await API.get(endpoints.categories).then((res) => {
        setCategories(res.data.result);
      });
    }

    async function getBrands() {
      await API.get(endpoints.brands).then((res) => {
        setBrands(res.data.result);
      });
    }

    getCategories();
    getBrands();
  }, []);

  console.log("images", images);

  return (
    <>
      <div className="row mt-4">
        <div className="col-md-5">
          <Card className="mt-3">
            <Card.Body>
              <Form onSubmit={handleSubmitForm}>
                <FloatingLabel
                  className="mb-3"
                  controlId="floatingSelect"
                  label="Phân loại sản phẩm"
                  value={categoryId}
                  defaultValue={"0"}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <Form.Select aria-label="Floating label select example">
                    <option value="0">Không chọn</option>
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
                  value={categoryId}
                  defaultValue={"1"}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <Form.Select aria-label="Floating label select example">
                    <option value="0">Không chọn</option>
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
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mô tả sản phẩm</Form.Label>
                  <Form.Control
                    id="description-input"
                    as="textarea"
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                  />
                </Form.Group>

                <Row className="g-2 mb-3">
                  <Col>
                    <InputGroup>
                      <Form.Control
                        placeholder="Giá gốc"
                        aria-label="Giá gốc"
                        aria-describedby="basic-addon2"
                        value={originalPrice}
                        onChange={(e) =>
                          handleNumberInputOnly(e, setOriginalPrice)
                        }
                      />
                      <InputGroup.Text id="basic-addon2">VNĐ</InputGroup.Text>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <Form.Control
                        placeholder="Giá sau khuyến mại"
                        aria-label="Giá sau khuyến mại"
                        aria-describedby="basic-addon2"
                        value={salePrice}
                        onChange={(e) => handleNumberInputOnly(e, setSalePrice)}
                      />
                      <InputGroup.Text id="basic-addon2">VNĐ</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    value={unitsInStock}
                    onChange={(e) => handleNumberInputOnly(e, setUnitsInStock)}
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <ImagesUpload setData={setFiles} setImages={setImages} />
                </Form.Group>

                <Button variant="dark" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md">
          <div className="card my-3">
            <div className="d-flex flex-column">
              <div className="border-end">
                <div className="d-flex flex-row justify-content-center">
                  <div className="main_image">
                    <img
                      src={
                        images.length
                          ? images[0]
                          : "https://en.pimg.jp/042/085/505/1/42085505.jpg"
                      }
                      id="main_product_image"
                      height="450"
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  </div>
                  <div className="thumbnail_images">
                    <ul id="thumbnail">
                      {images?.map((image) => {
                        if (image.linkToImage.startsWith("http")) {
                          return (
                            <li key={image.id}>
                              <img
                                src={image.linkToImage}
                                onClick={() =>
                                  (document.getElementById(
                                    "main_product_image"
                                  ).src = image.linkToImage)
                                }
                                height="70"
                              />
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between">
                <div className="p-4 right-side">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{name ? name : "Tên sản phẩm"}</h3>
                  </div>
                  <div
                    className="mt-2 pr-3 content"
                    style={{ textAlign: "justify" }}
                  >
                    <p>{description ? description : "Mô tả sản phẩm"}</p>
                  </div>
                </div>
                <div className="bottom-panel">
                  <div className="prices">
                    <h4 className="text-decoration-line-through">
                      {originalPrice
                        ? `${toVND(originalPrice)} VNĐ`
                        : "Original price"}
                    </h4>
                    <h4>
                      {salePrice ? `${toVND(salePrice)} VNĐ` : "Sale price"}
                    </h4>
                  </div>
                  <div className="buttons d-flex flex-row gap-3">
                    <button className="btn btn-outline-dark">Buy Now</button>{" "}
                    <button className="btn btn-dark">Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
