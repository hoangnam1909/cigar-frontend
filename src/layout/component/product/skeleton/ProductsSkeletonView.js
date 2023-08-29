import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductsSkeletonView({ count, className }) {
  let elements = [];

  for (let i = 0; i < count; i++) {
    elements.push(
      <div key={i} className={className}>
        <ProductCardSkeleton className={"shadow"} />
      </div>
    );
  }

  return <div className="row mx-auto">{elements}</div>;
}
