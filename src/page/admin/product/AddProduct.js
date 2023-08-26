import { useEffect, useState } from "react";
import {
  Button,
  Card,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
} from "react-bootstrap";
import API, { endpoints } from "~/api/API";
import { toVND } from "~/utils/currency";
import RichTextEditor from "~/components/input/RichTextEditor";
import { ZaloIcon } from "~/assets/img/ZaloIcon";
import { ImagesUpload } from "~/components/input/ImagesUpload";
import AuthAPI from "~/api/AuthAPI";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState("0");
  const [salePrice, setSalePrice] = useState("0");
  const [unitsInStock, setUnitsInStock] = useState("0");
  const [categoryId, setCategoryId] = useState(1);
  const [brandId, setBrandId] = useState(1);
  const [images, setImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // console.log(originalPrice === 0 || salePrice === 0);
  }, [salePrice, originalPrice]);

  const initialValue = () => {
    setName("");
    setDescription("");
    setOriginalPrice("0");
    setSalePrice("0");
    setCategoryId(1);
    setBrandId(1);
    setUnitsInStock("0");
    setImages([]);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const res = await AuthAPI().post(endpoints.products, {
      name: name,
      description: description,
      originalPrice: parseInt(originalPrice),
      salePrice: parseInt(salePrice),
      categoryId: parseInt(categoryId),
      brandId: parseInt(brandId),
      unitsInStock: parseInt(unitsInStock),
      productImagesLink: images,
    });
    if (res.status == 200) {
      navigate("/admin/products");
    }
  };

  const handleNumberInputOnly = (e, setData) => {
    const re = /^[0-9]*$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setData(e.target.value);
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <>
      <h2 className="mt-3">Thêm sản phẩm</h2>
      <div className="row">
        <div className="col-md-12 col-lg-6 col-xl-5">
          <Card className="mt-3">
            <Card.Body>
              <Form onSubmit={handleSubmitForm}>
                <FloatingLabel
                  className="mb-3"
                  controlId="floatingSelect"
                  label="Phân loại sản phẩm"
                  value={categoryId}
                  defaultValue={"1"}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <Form.Select aria-label="Floating label select example">
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
                  value={brandId}
                  defaultValue={"1"}
                  onChange={(e) => setBrandId(e.target.value)}
                >
                  <Form.Select aria-label="Floating label select example">
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
                  <RichTextEditor data={description} setData={setDescription} />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Giá gốc</Form.Label>
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
                      value={salePrice}
                      onChange={(e) => handleNumberInputOnly(e, setSalePrice)}
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
                    value={unitsInStock}
                    onChange={(e) => handleNumberInputOnly(e, setUnitsInStock)}
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <ImagesUpload images={images} setImages={setImages} />
                  {images?.map((link, index) => {
                    return (
                      <Image
                        key={index}
                        src={link}
                        style={{ height: "200px", objectFit: "cover" }}
                        fluid
                        rounded
                        className="me-2 mb-2 border"
                      />
                    );
                  })}
                </Form.Group>

                <Button variant="dark" className="w-100 my-2" type="submit">
                  Thêm sản phẩm
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-12 col-lg-6 col-xl-7">
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
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-between">
                <div className="p-3 right-side">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{name ? name : "Tên sản phẩm"}</h3>
                  </div>
                  <div style={{ textAlign: "justify" }}>
                    <div>
                      {description ? (
                        <p
                          dangerouslySetInnerHTML={{
                            __html: description,
                          }}
                        />
                      ) : (
                        <p>Mô tả sản phẩm</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bottom-panel">
                  <div className="prices">
                    {salePrice == 0 || unitsInStock == 0 ? (
                      <>
                        <h5 className="card-title text-end text-primary text-center">
                          Liên hệ qua Zalo
                        </h5>
                        <h5 className="card-title text-end text-danger text-center mb-2">
                          <div className="w-100">
                            <button
                              type="button"
                              className="btn btn-primary w-100"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <ZaloIcon className="me-2" size="35px" />
                              Zalo
                            </button>
                            <ul className="dropdown-menu w-100">
                              <li>
                                <a
                                  className="dropdown-item"
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`https://zalo.me/${process.env.REACT_APP_HANOI_ZALO_NUMBER}`}
                                >
                                  <ZaloIcon className="me-2" size="35px" />
                                  Hà Nội
                                </a>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item"
                                  target="_blank"
                                  rel="noreferrer"
                                  href={`https://zalo.me/${process.env.REACT_APP_HCM_ZALO_NUMBER}`}
                                >
                                  <ZaloIcon className="me-2" size="35px" />
                                  Thành phố Hồ Chí Minh
                                </a>
                              </li>
                            </ul>
                          </div>
                        </h5>
                      </>
                    ) : (
                      <>
                        <h4 className="text-decoration-line-through">
                          {originalPrice
                            ? `${toVND(originalPrice)} VND`
                            : "Original price"}
                        </h4>
                        <h4>
                          {salePrice ? `${toVND(salePrice)} VND` : "Sale price"}
                        </h4>
                      </>
                    )}
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
