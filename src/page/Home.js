import BrandCarousels from "~/layout/home/BrandCarousels";
import BrandFeatures from "~/layout/home/BrandFeatures/BrandFeatures";
import Products from "~/layout/product/Products";

export default function Home() {
  return (
    <>
      <BrandCarousels />

      <BrandFeatures />

      <h2 className="text-center my-4">SẢN PHẨM NỔI BẬT</h2>

      <Products />
    </>
  );
}
