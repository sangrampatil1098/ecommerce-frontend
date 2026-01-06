import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_END_POINT}`,
  withCredentials: true,
});

export default axiosInstance;
