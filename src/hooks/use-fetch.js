import React, { useEffect, useState } from "react";
import apiClient from "../utils/api-client";

const useFetch = (urlPath) => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    apiClient
      .get(urlPath)
      .then((res) => setData(res.data))
      .catch((err) => setErrors(err.message));
  }, [urlPath]);

  return { data, errors };
};

export default useFetch;
