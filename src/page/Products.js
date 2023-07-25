import "./css/Products.css";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import API, { endpoints } from "~/config/API";
import ProductsView from "~/layout/product/ProductsView";
import queryString from "query-string";
import Pagination from "~/layout/component/Pagination";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productsRes, setProductsRes] = useState();

  useEffect(() => {
    async function getCategories() {
      const res = await API.get(endpoints.categories);
      const data = res.data.result;
      setCategories(data);
    }

    getCategories();
  }, []);

  useEffect(() => {
    async function getBrands() {
      const res = await API.get(endpoints.brands);
      const data = res.data.result;
      setBrands(data);
    }

    getBrands();
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);

    async function getProducts() {
      await API.get(endpoints.products, {
        params: {
          ...params,
          page: searchParams.get("page")
            ? parseInt(searchParams.get("page"))
            : 1,
          size: "5",
        },
      }).then((res) => {
        setProductsRes(res.data.result);
      });
    }

    getProducts();
  }, [searchParams]);

  return (
    <>
      <div className="row mt-4">
        <aside className="col-md-3">
          <div id="categories-card" className="card mb-3">
            <div className="card-header">
              <h6 className="card-title m-0">Danh mục</h6>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {categories?.map((cate) => {
                  if (searchParams.get("categoryId") == cate.id) {
                    return (
                      <li
                        key={cate.id}
                        className="list-group-item text-light bg-secondary d-flex justify-content-between align-items-center"
                        onClick={() => {
                          searchParams.set("categoryId", `${cate.id}`);
                          setSearchParams(searchParams);
                        }}
                      >
                        {cate.name}
                        <span className="badge bg-light text-secondary rounded-pill">
                          {cate.productsCount}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={cate.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      onClick={() => {
                        searchParams.set("categoryId", `${cate.id}`);
                        setSearchParams(searchParams);
                      }}
                    >
                      {cate.name}
                      <span className="badge bg-secondary rounded-pill">
                        {cate.productsCount}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div id="brands-card" className="card mb-3">
            <div className="card-header">
              <h6 className="card-title m-0">Hãng</h6>
            </div>
            <div className="card-body">
              <ul className="list-group">
                {brands?.map((brand) => {
                  if (searchParams.get("brandId") == brand.id) {
                    return (
                      <li
                        key={brand.id}
                        className="list-group-item text-light bg-secondary d-flex justify-content-between align-items-center"
                        onClick={() => {
                          searchParams.set("brandId", `${brand.id}`);
                          setSearchParams(searchParams);
                        }}
                      >
                        {brand.name}
                        <span className="badge bg-light text-secondary rounded-pill">
                          {brand.productsCount}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={brand.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                      onClick={() => {
                        searchParams.set("brandId", `${brand.id}`);
                        setSearchParams(searchParams);
                      }}
                    >
                      {brand.name}
                      <span className="badge bg-secondary rounded-pill">
                        {brand.productsCount}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div id="buttons-card" className="card mb-3">
            <a
              class="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                setSearchParams();
              }}
            >
              Reset filter
            </a>
          </div>
        </aside>

        <main className="col-md">
          <header className="border-bottom mb-4 pb-3">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mr-md-auto m-0">
                Có {productsRes?.totalElements} sản phẩm được tìm thấy
              </h5>
              <select className="form-control w-50">
                <option>Giá tăng dần</option>
                <option>Giá giảm dần</option>
                <option>Mới nhất</option>
              </select>
            </div>
          </header>

          <div className="row">
            <ProductsView products={productsRes?.content} />
          </div>

          <nav className="mt-4" aria-label="Page navigation sample">
            <Pagination
              currentPage={productsRes?.number + 1}
              totalPages={productsRes?.totalPages}
            />
          </nav>
        </main>
      </div>
    </>
  );
}
