import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = (props) => {
  const Location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [Location]);

  return <>{props.children}</>;
};

export default ScrollToTop;
