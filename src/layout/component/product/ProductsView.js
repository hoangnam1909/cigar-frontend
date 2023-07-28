import ProductCard from "./ProductCard";

export default function ProductsView(props) {
  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">
        {props.products?.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
