import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { BASE_URL } from "../constants/URL";

let authTokens = localStorage.getItem("tuni")
  ? localStorage.getItem("tuni")
  : null;

const axiosInstance = axios.create({
  BASE_URL,
  headers: { Authorization: `Bearer ${authTokens}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("tuni")
      ? localStorage.getItem("tuni")
      : null;
    req.headers.Authorization = `${authTokens}`;
  }

  const user = jwt_decode(authTokens);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (!isExpired) return req;

  const response = await axios.post(
    `${BASE_URL}/api/v1/auth/token`,
    {},
    { withCredentials: true }
  );

  localStorage.setItem("tuni", JSON.stringify(response.data.data.accessToken));
  req.headers.Authorization = `${response.data.data.accessToken}`;
  return req;
});

export default axiosInstance;
