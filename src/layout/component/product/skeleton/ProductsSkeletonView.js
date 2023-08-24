import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductsSkeletonView(props) {
  let elements = [];

  for (let i = 0; i < props.count; i++) {
    elements.push(
      <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <ProductCardSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="row mx-auto">{elements}</div>
    </>
  );
}
