import { useParams } from "react-router-dom";
import { endpoints } from "~/config/API";
import "./css/ProductDetail.css";
import useAxios from "~/utils/useAxios";
import { toVND } from "~/utils/currency";

export default function ProductDetail() {
  const { productId } = useParams();
  const [result, { isLoading, isSuccess, isError, error }] = useAxios({
    url: endpoints.products.concat(`/${productId}`),
    method: "get",
  });

  function changeProductImage(link) {
    if (isSuccess) {
      document.getElementById("main_product_image").src = link;
    }
  }

  // useEffect(() => {
  //   if (isSuccess) {
  //     document.getElementById("main_product_image").src = productImage;
  //   }
  // }, [productImage]);

  if (!isSuccess) {
    return (
      <>
        <h1>DO NOT HAVE DATA</h1>
      </>
    );
  }

  return (
    <>
      <div className="card my-3">
        <div className="row g-0">
          <div className="col-md border-end">
            <div className="d-flex flex-column justify-content-center">
              <div className="main_image">
                <img
                  src={result.result.productImages[0].linkToImage}
                  id="main_product_image"
                  height="450"
                  style={{ objectFit: "cover", borderRadius: "4px" }}
                />
              </div>
              <div className="thumbnail_images">
                <ul id="thumbnail">
                  {result.result.productImages.map((image) => {
                    if (image.linkToImage.startsWith("http")) {
                      return (
                        <li key={image.id}>
                          <img
                            src={image.linkToImage}
                            onClick={() =>
                              changeProductImage(image.linkToImage)
                            }
                            height="70"
                          />
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md d-flex flex-column justify-content-between">
            <div className="p-4 right-side">
              <div className="d-flex justify-content-between align-items-center">
                <h3>{result.result.name}</h3>
              </div>
              <div
                className="mt-2 pr-3 content"
                style={{ textAlign: "justify" }}
              >
                <p>{result.result.description}</p>
              </div>
            </div>
            <div className="bottom-panel">
              <div className="prices">
                <h4 className="text-decoration-line-through">
                  {isSuccess
                    ? toVND(result.result.originalPrice)
                    : "Original price"}
                </h4>
                <h4>
                  {isSuccess ? toVND(result.result.salePrice) : "Sale price"}
                </h4>
              </div>
              <div className="buttons d-flex flex-row gap-3">
                <button className="btn btn-outline-dark">Buy Now</button>{" "}
                <button className="btn btn-dark">Add to Basket</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
