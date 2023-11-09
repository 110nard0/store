// HDR : MAKING API REQUESTS

import jwtDecode from "jwt-decode";
import apiClient from "../utils/api-client";

// SUB: Register new waitlisted user
const newWaitUser = (data) => {
  return apiClient.post("/waitlist/", data);
};

const isWaitlisted = (email) => {
  return apiClient.get(`/waitlist?identifier=${email}`);
};

// SUB: CREATE NEW USER

const createNewUser = (data) => {
  return apiClient.post("/register/", data);
};

// SUB: LOGIN

const login = async (user) => {
  const res = await apiClient.post("/token/", user);
  localStorage.setItem("TRGSTTOKEN", JSON.stringify(res.data));

  return res;
};

const getJwtToken = () => {
  return JSON.parse(localStorage.getItem("TRGSTTOKEN"));
};

// SUB: GET USERS
const getUser = () => {
  try {
    let jwt = JSON.parse(localStorage.getItem("TRGSTTOKEN"));
    return jwtDecode(jwt.access);
  } catch (err) {
    return null;
  }
};

export {
  newWaitUser,
  isWaitlisted,
  createNewUser,
  login,
  getUser,
  getJwtToken,
};
