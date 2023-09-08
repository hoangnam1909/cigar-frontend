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
      <div className="container-fluid mt-3">
        <h3 className="mt-2 mb-4 text-gray-800">Thêm sản phẩm</h3>
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
                    onChange={(e) => handleNumberInputOnly(e, setOriginalPrice)}
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
    </>
  );
}
