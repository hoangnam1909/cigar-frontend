import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API, { adminEndpoints, endpoints } from "~/api/API";
import AuthAPI from "~/api/AuthAPI";
import { ImagesUpload } from "~/components/input/ImagesUpload";
import RichTextEditor from "~/components/input/RichTextEditor";
import ListImagePreview from "~/layout/component/img/ListImagePreview";
import { numberInputOnly } from "~/utils/input";

export default function ProductEdit() {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    originalPrice: 0,
    salePrice: 0,
    unitsInStock: 0,
    categoryId: 1,
    brandId: 1,
    // productImages: [],
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

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

    // const res = await AuthAPI().put(
    //   `${adminEndpoints.products}/${productId}`,
    //   product
    // );
    // if (res.status === 200) {
    //   setIsLoading(false);
    //   getProduct();
    // }

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

    const res = await AuthAPI().put(
      `${adminEndpoints.products}/${productId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (res.status == 200) {
      setIsLoading(false);
      getProduct();
    }
  };

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

  const getProduct = async () => {
    const response = await AuthAPI().get(
      adminEndpoints.products + `/${productId}`
    );
    if (response.status === 200) {
      setImages(
        response?.data.result.productImages.map((img) => img.linkToImage)
      );

      setProduct({
        ...product,
        name: response?.data.result.name ? response?.data.result.name : "",
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
          ? response?.data.result.productImages.map((img) => img.linkToImage)
          : [],
      });
    }
  };

  useEffect(() => {
    getCategories();
    getBrands();
    getProduct();
  }, []);

  console.log(product);

  return (
    <>
      <div className="container-fluid mt-3">
        <h3 className="mt-2 mb-4 text-gray-800">
          Chỉnh sửa thông tin sản phẩm
        </h3>

        <div className="card my-3">
          <div className="card-body">
            <form onSubmit={handleSubmitForm}>
              <div className="mb-3 form-floating">
                <select
                  className="form-select"
                  id="floating-select-category"
                  value={product?.categoryId}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      categoryId: parseInt(e.target.value),
                    })
                  }
                >
                  {categories?.map((category) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floating-select-category">Danh mục</label>
              </div>

              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="floating-select-brand"
                  value={product?.brandId}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      brandId: parseInt(e.target.value),
                    })
                  }
                >
                  {brands?.map((brand) => {
                    return (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floating-select-brand">Thương hiệu</label>
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
                className="btn btn-dark w-100 mb-2"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                ) : (
                  <span role="status">Lưu các thay đổi</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
