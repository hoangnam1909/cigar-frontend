import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductsSkeletonView(props) {
  let elements = [];

  for (let i = 0; i < props.count; i++) {
    elements.push(<ProductCardSkeleton key={i} />);
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center">{elements}</div>
    </>
  );
}
