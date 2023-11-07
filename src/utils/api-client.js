import axios from "axios";

const baseUrl = import.meta.env.VITE_API_ENDPOINT;

export default axios.create({
  baseURL: baseUrl,
});
