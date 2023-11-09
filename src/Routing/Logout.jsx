import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("TRGSTTOKEN");
    window.location = "/";
  }, []);

  return null;
};

export default Logout;
