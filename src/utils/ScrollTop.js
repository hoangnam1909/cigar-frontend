import { useLayoutEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ScrollTop = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname.startsWith("/products")) {
      let productGridView = document.getElementById("product-grid-view");

      if (productGridView && window.innerWidth < 768) {
        // console.log("start scroll");
        window.scrollTo({
          top: productGridView.offsetTop - (56 + 12),
          behavior: "auto",
        });
        // console.log("end scroll");
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    // let productGridView = document.getElementById("product-grid-view");
    // console.log(productGridView);
    // if (productGridView && window.innerWidth < 768) {
    //   // console.log("start scroll");
    //   window.scrollTo({
    //     top: productGridView.offsetTop - (56 + 12),
    //     behavior: "smooth",
    //   });
    //   // console.log("end scroll");
    // } else {
    //   window.scrollTo({ top: 0, behavior: "smooth" });
    // }
  }, [pathname, searchParams]);

  useLayoutEffect(() => {
    if (!pathname.startsWith("/admin")) {
      let toggler = document.querySelector("button.navbar-toggler.collapsed");
      if (toggler == null) {
        document.querySelector("button.navbar-toggler").click();
      }
    }
  }, [location]);

  return null;
};

export default ScrollTop;
