import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://roselle-official-1x35.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;