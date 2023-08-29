import "./css/Home.css";
import { useState } from "react";
import { useEffect } from "react";
import API, { endpoints } from "~/api/API";
import SpecifyCard from "~/layout/home/specify-cards/SpecifyCard";
import specify from "~/data/specify.json";
import ProductsView from "~/layout/component/product/ProductsView";
import { Link } from "react-router-dom";
import ProductsSkeletonView from "~/layout/component/product/skeleton/ProductsSkeletonView";

export default function Home() {
  const [products, setProducts] = useState([]);
  const PAGE_SIZE = 12;

  document.title = "Trang chủ";

  useEffect(() => {
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

    getProducts();
  }, []);

  return (
    <>
      <div className="p-5 my-4 bg-light rounded-3 back-img-parent">
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

      <div className="mt-3 d-flex justify-content-center">
        <div className="row mx-auto">
          {specify?.map((spec, index) => {
            return (
              <div className="col-sm-12 col-md-4 col-lg-4">
                <SpecifyCard key={index} spec={spec} />
              </div>
            );
          })}
        </div>
      </div>

      <h2 className="text-center mt-5">SẢN PHẨM NỔI BẬT</h2>

      <div className="mt-4 d-flex justify-content-center">
        {products.length > 0 ? (
          <ProductsView
            products={products}
            childClassName={"col-6 col-md-4 col-lg-3 col-xl-2 px-1"}
          />
        ) : (
          <ProductsSkeletonView
            count={PAGE_SIZE}
            className="col-6 col-md-4 col-lg-3 col-xl-2 px-1"
          />
        )}
      </div>
    </>
  );
}
