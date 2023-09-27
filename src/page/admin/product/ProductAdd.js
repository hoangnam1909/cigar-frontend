import { useEffect, useState } from "react";
import API, { adminEndpoints, endpoints } from "~/api/API";
import RichTextEditor from "~/components/input/RichTextEditor";
import { ImagesUpload } from "~/components/input/ImagesUpload";
import AuthAPI from "~/api/AuthAPI";
import { useNavigate } from "react-router-dom";
import ListImagePreview from "~/layout/component/img/ListImagePreview";
import { numberInputOnly } from "~/utils/input";

export default function ProductAdd() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    originalPrice: 0,
    salePrice: 0,
    unitsInStock: 0,
    categoryId: 1,
    brandId: 1,
  });
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState();

  const handleQuillEdit = (value) => {
    setProduct((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
  };

  const handleSubmitForm = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product).toString()], {
        type: "application/json",
      })
    );
    Array.from(imageFiles).forEach((file) => {
      formData.append("files", file);
    });

    const res = await AuthAPI().post(adminEndpoints.products, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.status == 200) {
      navigate("/admin/products");
      setIsLoading(false);
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
    <div
      className={`container-fluid mt-3 ${
        isLoading ? "pe-none opacity-75" : ""
      }`}
    >
      <h3 className="mt-2 mb-4 text-gray-800">Thêm sản phẩm</h3>
      <div className="card mt-3">
        <div className="card-body">
          <form onSubmit={handleSubmitForm}>
            <div className="mb-3 form-floating">
              <select
                className="form-select"
                id="floatingSelectCategory"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    categoryId: parseInt(e.target.value),
                  })
                }
              >
                {categories?.map((c) => {
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="floatingSelectCategory">Danh mục</label>
            </div>

            <div className="mb-3 form-floating">
              <select
                className="form-select"
                id="floatingSelectBrand"
                onChange={(e) =>
                  setProduct({
                    ...product,
                    brandId: parseInt(e.target.value),
                  })
                }
              >
                {brands?.map((b) => {
                  return (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="floatingSelectBrand">Thương hiệu</label>
            </div>

            <div className="mb-3">
              <label className="mb-2">Tên sản phẩm</label>
              <input
                className="form-control"
                id="name-input"
                type="text"
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
                value={product?.name}
              />
            </div>

            <div className="mb-3">
              <label className="mb-2">Mô tả sản phẩm</label>
              <RichTextEditor
                data={product?.description}
                onChange={handleQuillEdit}
              />
            </div>

            <div className="mb-3">
              <label className="mb-2">Giá gốc</label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Giá gốc"
                  aria-label="Giá gốc"
                  aria-describedby="basic-addon1"
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
                <span className="input-group-text" id="basic-addon1">
                  VND
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="mb-2">Giá sau khuyến mại</label>
              <div className="input-group">
                <input
                  className="form-control"
                  placeholder="Giá sau khuyến mại"
                  aria-label="Giá sau khuyến mại"
                  aria-describedby="basic-addon2"
                  value={parseInt(product?.salePrice ? product?.salePrice : 0)}
                  onChange={(e) => {
                    if (numberInputOnly(e.target.value)) {
                      setProduct({
                        ...product,
                        salePrice: parseInt(e.target.value),
                      });
                    }
                  }}
                />
                <span className="input-group-text" id="basic-addon2">
                  VND
                </span>
              </div>
            </div>

            <div className="mb-3">
              <label className="mb-2">Số lượng</label>
              <input
                className="form-control"
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
            </div>

            <div className="mb-3">
              <ImagesUpload
                setImages={setImages}
                setImageFiles={setImageFiles}
              />
              <ListImagePreview imageList={images} />
            </div>

            <button
              className="btn btn-dark btn-lg w-100 mb-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="spinner-border me-2" aria-hidden="true"></span>
              ) : (
                <span role="status">Thêm sản phẩm</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
