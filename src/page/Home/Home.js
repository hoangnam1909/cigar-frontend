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

  document.title = "Cigar For Boss - Trang chủ";

  useEffect(() => {
    async function fetchProducts() {
      await API()
        .get(endpoints.products, {
          params: {
            page: "1",
            size: "6",
          },
        })
        .then((res) => {
          setProducts(res.data.result.content);
        });
    }

    fetchProducts();
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

      <div className="mt-3 d-flex flex-row flex-wrap justify-content-center">
        {specify?.map((spec, index) => {
          return <SpecifyCard key={index} spec={spec} />;
        })}
      </div>

      <h2 className="text-center mt-4">SẢN PHẨM NỔI BẬT</h2>

      <div className="mt-4 d-flex justify-content-center">
        {products.length > 0 ? (
          <>
            <ProductsView products={products} />
          </>
        ) : (
          <>
            <ProductsSkeletonView count={6} />
          </>
        )}
      </div>
    </>
  );
}
