import "./css/Home.css";
import { useState } from "react";
import { useEffect } from "react";
import API, { endpoints } from "~/api/API";
import SpecifyCard from "~/layout/home/specify-cards/SpecifyCard";
import specify from "~/data/specify.json";
import ProductsView from "~/layout/component/product/ProductsView";
import { Link } from "react-router-dom";
import ProductsSkeletonView from "~/layout/component/product/skeleton/ProductsSkeletonView";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [topBrands, setTopBrands] = useState([]);
  const PAGE_SIZE = 12;

  document.title = "Trang chủ";

  async function getProducts() {
    await API()
      .get(endpoints.products, {
        params: {
          page: "1",
          size: PAGE_SIZE,
        },
      })
      .then((res) => {
        setProducts(res.data.result.content);
      });
  }

  async function getTopBrands() {
    const res = await API().get(`${endpoints.brands}/top/3`);
    if (res.status === 200) {
      setTopBrands(res.data.result);
    }
  }

  useEffect(() => {
    getProducts();
    getTopBrands();
  }, []);

  return (
    <>
      <div className="p-5 mt-4 mb-3 bg-light rounded-3 back-img-parent">
        <div className="rounded-3 back-img"></div>
        <div className="rounded-3 back-dark"></div>
        <div className="container-fluid py-5 jumbotron-content">
          <h1 className="display-5 fw-bold">Cigar For Boss</h1>
          <p className="col-md-8 fs-5">
            Cigar For Boss là cửa hàng chuyên kinh doanh mặt hàng Cigar Habanos
            Cuba, được nhập khẩu từ Châu Âu với chất lượng đảm bảo nhất! Tới với
            Cigar For Boss, quý khách sẽ được trải nghiệm xì gà hoàn hảo.
          </p>
          <Link
            className="btn btn-outline-light btn-lg"
            type="button"
            to="/contact"
          >
            Liên hệ với chúng tôi
          </Link>
        </div>
      </div>

      <div className="row mx-auto">
        {specify?.map((spec, index) => {
          return (
            <div
              key={index}
              className="mb-3 col-12 col-md-4 mb-md-0 col-lg-4 px-1"
            >
              <SpecifyCard spec={spec} />
            </div>
          );
        })}
      </div>

      <h2 className="text-center mt-4 mt-md-5 mb-4">SẢN PHẨM NỔI BẬT</h2>
      {products.length > 0 ? (
        <ProductsView
          products={products}
          className={"mx-auto"}
          columnClassName={"col-6 col-md-4 col-lg-3 col-xl-2 px-1"}
        />
      ) : (
        <ProductsSkeletonView
          count={PAGE_SIZE}
          className={"mx-auto"}
          columnClassName="col-6 col-md-4 col-lg-3 col-xl-2 px-1"
        />
      )}

      {topBrands.length != 0 ? (
        <>
          {topBrands?.map((brand) => {
            if (brand.products.length > 0)
              return (
                <div key={brand?.id} className="px-0 py-3 mt-1">
                  <h3 className="p-1 mb-2 mx-2 text-md-center">
                    {brand?.name}
                  </h3>

                  <ProductsView
                    products={brand?.products}
                    className={"mx-0"}
                    columnClassName={"col-6 col-md-4 col-lg-3 col-xl-2 px-1"}
                    cardClassName={"border"}
                  />
                  <div className="d-flex justify-content-center">
                    <Link
                      to={`/products?brandId=${brand?.id}`}
                      className="btn btn-outline-secondary text-center mt-3 mb-1 px-5"
                    >
                      Xem tất cả
                    </Link>
                  </div>
                </div>
              );
          })}
        </>
      ) : (
        <>
          <div className="card px-1 py-3 mt-4 d-flex justify-content-center loading-skeleton">
            <h4 className="p-1 mb-2 mx-2 text-center">...</h4>
            <ProductsSkeletonView
              count={6}
              className={"mx-1"}
              columnClassName="col-6 col-md-4 col-lg-3 col-xl-2 px-1"
              cardClassName={"border"}
            />
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-secondary text-center mt-3 mb-1 px-5">
                Xem tất cả
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
