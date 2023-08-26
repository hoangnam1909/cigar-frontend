import "./css/Products.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import API, { endpoints } from "~/api/API";
import queryString from "query-string";
import sortData from "~/data/sortBy.json";
import { FilterCard } from "~/layout/component/product/FilterCard";
import FilterDropdown from "~/layout/component/product/FilterDropdown";
import ProductsView from "~/layout/component/product/ProductsView";
import ProductsSkeletonView from "~/layout/component/product/skeleton/ProductsSkeletonView";
import ArrowPagination from "~/components/paginate/ArrowPagination";
import Pagination from "~/components/paginate/Pagination";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productsRes, setProductsRes] = useState(null);
  const PAGE_SIZE = 6;

  document.title = "Cigar For Boss - Sản phẩm";

  useEffect(() => {
    async function getCategories() {
      const res = await API().get(endpoints.categories);
      const data = res.data.result;
      setCategories(data);
    }

    getCategories();
  }, []);

  useEffect(() => {
    async function getBrands() {
      const res = await API().get(endpoints.brands);
      const data = res.data.result;
      setBrands(data);
    }

    getBrands();
  }, []);

  useEffect(() => {
    const params = queryString.parse(location.search);

    async function getProducts() {
      const res = await API().get(endpoints.products, {
        params: {
          ...params,
          page: searchParams.get("page")
            ? parseInt(searchParams.get("page"))
            : 1,
          size: PAGE_SIZE,
        },
      });
      console.log(res);
      if (res.status === 200) setProductsRes(res.data.result);
    }

    getProducts();
  }, [searchParams]);

  console.log("productsRes", productsRes != null);
  console.log(
    "productsRes?.numberOfElements",
    productsRes?.numberOfElements !== 0
  );

  return (
    <>
      <div className="row mt-4">
        <aside className="col-md-3">
          <FilterCard type="text" filterName="Tên sản phẩm" filterKey="name" />

          <FilterCard
            type="select"
            filterName="Danh mục"
            filterKey="categoryId"
            filterList={categories}
          />

          <FilterCard
            type="select"
            filterName="Hãng sản xuất"
            filterKey="brandId"
            filterList={brands}
          />

          <div id="buttons-card" className="card mb-3">
            <a
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                setSearchParams();
              }}
            >
              Loại bỏ bộ lọc
            </a>
          </div>
        </aside>

        <main className="col-md" id="product-grid-view">
          <header className="border-bottom mb-2">
            <div className="px-2 d-flex justify-content-between align-items-center flex-wrap">
              {productsRes != null && productsRes?.numberOfElements != 0 ? (
                <>
                  <h5 className="mr-md-auto mb-3">
                    Có {productsRes?.totalElements} sản phẩm được tìm thấy
                  </h5>
                  <div className="d-flex mb-3">
                    <FilterDropdown
                      filterObj={sortData}
                      className="me-5 w-100"
                    />
                    <ArrowPagination
                      currentPage={productsRes?.number + 1}
                      totalPages={productsRes?.totalPages}
                    />
                  </div>
                </>
              ) : productsRes?.numberOfElements == 0 ? (
                <>
                  <h5 className="mr-md-auto mb-3">
                    Không có sản phẩm nào được tìm thấy
                  </h5>
                </>
              ) : (
                <>
                  <h5 className="mr-md-auto mb-3">Đang tải...</h5>
                  <div
                    className="spinner-border text-secondary ms-auto mb-3"
                    aria-hidden="true"
                  ></div>
                </>
              )}
            </div>
          </header>

          <div className="row">
            {productsRes != null && productsRes?.numberOfElements != 0 ? (
              <>
                <ProductsView
                  products={productsRes?.content}
                  childClassName={"col-sm-12 col-md-6 col-xl-4"}
                />

                <nav className="mt-4">
                  <Pagination
                    currentPage={productsRes?.number + 1}
                    totalPages={productsRes?.totalPages}
                  />
                </nav>
              </>
            ) : productsRes?.numberOfElements == 0 ? null : (
              <>
                <ProductsSkeletonView
                  count={PAGE_SIZE}
                  className={"col-sm-12 col-md-6 col-xl-4"}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
