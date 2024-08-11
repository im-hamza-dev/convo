import axios from "axios";
import { BASE_URL_PROD, BASE_URL_LOCAL } from "../utils/environmentStates";

let baseURL = BASE_URL_PROD;
if (window.location.href.includes("localhost")) {
  baseURL = BASE_URL_LOCAL;
}
const axiosApi = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setHeaderToken = (user) => {
  if (user?.token) {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }
};

export const post = async (url, payload = {}) => {
  const data = await axiosApi
    .post(url, payload)
    .then((resp) => resp?.data)
    .catch((err) => ({ error: err?.response?.data }));
  return data;
};

export const put = async (url, payload = {}) => {
  const data = await axiosApi
    .put(url, payload)
    .then((resp) => resp?.data)
    .catch((err) => ({ error: err.response.data }));
  return data;
};

export const get = async (url) => {
  const data = await axiosApi
    .get(url)
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
  return data;
};

export const del = async (url) => {
  const data = await axiosApi
    .delete(url)
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
  return data;
};

export default axiosApi;
