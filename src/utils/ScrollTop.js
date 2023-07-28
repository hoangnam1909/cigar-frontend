import { useLayoutEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ScrollTop = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, searchParams]);

  useLayoutEffect(() => {
    let toggler = document.querySelector("button.navbar-toggler.collapsed");
    if (toggler == null) {
      document.querySelector("button.navbar-toggler").click();
    }
  }, [location]);

  return null;
};

export default ScrollTop;