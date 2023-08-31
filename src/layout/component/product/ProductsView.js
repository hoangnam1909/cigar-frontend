import ProductCard from "./ProductCard";

export default function ProductsView({
  products,
  className,
  columnClassName,
  cardClassName,
}) {
  return (
    <>
      <div className={`row ${className}`}>
        {products?.map((p) => (
          <div key={p.id} className={columnClassName}>
            <ProductCard key={p.id} product={p} className={cardClassName} />
          </div>
        ))}
      </div>
    </>
  );
}
