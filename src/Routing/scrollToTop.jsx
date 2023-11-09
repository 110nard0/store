import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = (props) => {
  const Location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      if (elem) {
        let rect = elem.getBoundingClientRect();
        window.scrollTo({
          top: rect.top + window.scrollY - 130,
          behavior: "smooth",
        });
      }
      return;
    } else {
      window.scrollTo(0, 0);
      return;
    }
  }, [Location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
