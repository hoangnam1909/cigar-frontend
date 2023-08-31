import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductsSkeletonView({ count, className }) {
  let elements = [];

  for (let i = 0; i < count; i++) {
    elements.push(
      <div key={i} className={className}>
        <ProductCardSkeleton />
      </div>
    );
  }

  return <div className="row px-1 mx-auto">{elements}</div>;
}
