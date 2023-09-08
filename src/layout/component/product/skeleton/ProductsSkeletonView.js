import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductsSkeletonView({
  count,
  className,
  columnClassName,
  cardClassName,
}) {
  let elements = [];

  for (let i = 0; i < count; i++) {
    elements.push(
      <div key={i} className={columnClassName ? columnClassName : ""}>
        <ProductCardSkeleton className={cardClassName ? cardClassName : ""} />
      </div>
    );
  }

  return <div className={`row ${className ? className : ""}`}>{elements}</div>;
}
