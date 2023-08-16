import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/IconScrollTop.css";

import { useEffect, useState } from "react";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import FadeInOut from "~/assets/animation/FadeInOut";

export default function IconScrollTop() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    toggleShow();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (scrollPosition > 400)
    return (
      <FadeInOut show={show} duration={500}>
        <button
          className="scrollToTop rounded-3"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      </FadeInOut>
    );
  else return null;
}
