import axios from "axios";
import { BASE_URL_PROD, BASE_URL_LOCAL } from "../utils/environmentStates";

let baseURL= BASE_URL_PROD
if(window.location.href.includes('localhost')){
  baseURL = BASE_URL_LOCAL
}
const axiosApi = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});



  
export const postRequest = async (url, payload = {}) => {
  const data = await axiosApi
    .post(url, payload)
    .then((resp) => resp?.data)
    .catch((err) => ({ error: err?.response?.data }));
  return data;
};

export const putRequest = async (url, payload = {}) => {
  const data = await axiosApi
    .put(url, payload)
    .then((resp) => resp?.data)
    .catch((err) => ({ error: err.response.data }));
  return data;
};

export const getRequest = async (url) => {
  const data = await axiosApi
    .get(url)
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
  return data;
};

export const deleteRequest = async (url) => {
  const data = await axiosApi
    .delete(url)
    .then((resp) => resp.data)
    .catch((err) => ({ error: err.response.data }));
  return data;
};


export default axiosApi;
