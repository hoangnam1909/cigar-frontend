import ProductCard from "./ProductCard";

export default function ProductsView({
  products,
  className,
  childClassName,
  cardClassName,
}) {
  return (
    <>
      <div className={`row ${className}`}>
        {products?.map((p) => (
          <div key={p.id} className={childClassName}>
            <ProductCard key={p.id} product={p} className={cardClassName} />
          </div>
        ))}
      </div>
    </>
  );
}
