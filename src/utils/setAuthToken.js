import { getJwtToken } from "@services";
import apiClient from "./api-client";
import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common["Authorization"] =
      "Bearer " + token?.access;
  } else {
    delete apiClient.defaults.headers.common["Authorization"];
  }
};

apiClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401) {
      let tkn = getJwtToken();
      let apiResponse = await apiClient.post("/token/refresh/", tkn);

      let access = apiResponse.data.access;

      let newTkn = { access, ...tkn.refresh };
      localStorage.setItem("TRGSTTOKEN", JSON.stringify(newTkn));

      err.config.headers["Authorization"] = "Bearer " + access;

      return axios(err.config);
    } else {
      return Promise.reject(err);
    }
  }
);

export default setAuthToken;
