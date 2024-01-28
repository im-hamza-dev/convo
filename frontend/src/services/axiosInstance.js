import axios from "axios";

let baseURL = "http://localhost:5000/";

const axiosApi = axios.create({
  baseURL: baseURL,
});

export default axiosApi;
