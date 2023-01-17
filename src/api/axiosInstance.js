import { getAccessToken, getAuth, setAccessToken } from "@/utils/localStorage";
import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (request) => {
  let accessToken = JSON.parse(getAccessToken());
  if (!accessToken) return request
  const baseUrl = process.env.REACT_APP_BASE_URL
  const auth = JSON.parse(getAuth());
  const isExpiredToken = Date.now() > jwt_decode(accessToken).exp * 1000;
  if (isExpiredToken) {
    const res = await axios.post(`${baseUrl}refreshToken`, { id: auth.id })
    accessToken = res.data.refreshToken;
    setAccessToken(accessToken)
  }
  const accessHeader = `Bearer ${accessToken}`;
  if (request.headers) {
    request.headers["Authorization"] = accessHeader;
  }
  return request;
});


export default axiosInstance;
