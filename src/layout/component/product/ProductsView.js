import ProductCard from "./ProductCard";

export default function ProductsView(props) {
  return (
    <>
      {/* <div className="d-flex flex-wrap justify-content-center"> */}
      <div className="row mx-auto">
        {props.products?.map((p) => (
          <div key={p.id} className="col-sm-12 col-md-6 col-xl-4">
            <ProductCard key={p.id} product={p} />
          </div>
        ))}
      </div>
    </>
  );
}
