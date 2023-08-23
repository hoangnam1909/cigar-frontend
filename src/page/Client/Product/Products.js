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
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productsRes, setProductsRes] = useState();
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
      setLoading(true);
      await API()
        .get(endpoints.products, {
          params: {
            ...params,
            page: searchParams.get("page")
              ? parseInt(searchParams.get("page"))
              : 1,
            size: PAGE_SIZE,
          },
        })
        .then((res) => {
          setProductsRes(res.data.result);
          setLoading(false);
        });
    }

    getProducts();
  }, [searchParams]);

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
            <div className="d-flex justify-content-around align-items-center flex-wrap">
              {loading === false ? (
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
              ) : (
                <>
                  <h5 className="mr-md-auto mb-3">
                    Có ... sản phẩm được tìm thấy
                  </h5>
                  <div className="d-flex mb-3">
                    <FilterDropdown
                      filterObj={sortData}
                      className="me-5 w-100"
                    />
                    <ArrowPagination currentPage={0} totalPages={0} />
                  </div>
                </>
              )}
            </div>
          </header>

          <div className="row">
            {loading === false ? (
              <>
                <ProductsView products={productsRes?.content} />

                <nav className="mt-4" aria-label="Page navigation sample">
                  <Pagination
                    currentPage={productsRes?.number + 1}
                    totalPages={productsRes?.totalPages}
                  />
                </nav>
              </>
            ) : (
              <ProductsSkeletonView count={PAGE_SIZE} />
            )}
          </div>
        </main>
      </div>
    </>
  );
}
