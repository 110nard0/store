import React, { useEffect, useRef, useState } from "react";

const useClickOutiside = (initialValue) => {
  const [visible, setVisible] = useState(initialValue);

  let ref = useRef("");

  const handler = (e) => {
    if (ref?.current && !ref?.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handler);

    return () => {
      document.addEventListener("mousedown", handler);
    };
  }, [ref]);
  return { ref, visible, setVisible };
};

export default useClickOutiside;
