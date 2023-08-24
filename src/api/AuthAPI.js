import axios from "axios";
import Cookies from "js-cookie";
import { isTokenExpired } from "~/service/AuthService";
import API, { endpoints } from "./API";

const AuthAPI = () =>
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });

AuthAPI().interceptors.request.use(
  async (request) => {
    if (isTokenExpired() && Cookies.get("rememberMe") === "true") {
      const res = await API().post(endpoints.refreshToken, {
        token: Cookies.get("accessToken"),
      });
      Cookies.set("accessToken", res.data.token);
      request.headers.Authorization = `Bearer ${Cookies.get("accessToken")}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AuthAPI.interceptors.response.use(
//   (response) => {
//     console.log("interceptors.response", response);
//     return response;
//   },
//   (error) => {
//     if (error.response.status == 401) {
//       if (Cookies.get("accessToken") == null) {
//         console.log("accessToken khong co");
//         window.location = "/auth";
//       } else {
//         console.log("accessToken het han");
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default AuthAPI;
