import ProductCard from "./ProductCard";

export default function ProductsView({ products, childClassName }) {
  return (
    <>
      <div className="row mx-auto">
        {products?.map((p) => (
          <div key={p.id} className={childClassName}>
            <ProductCard key={p.id} product={p} />
          </div>
        ))}
      </div>
    </>
  );
}
