import axios from "axios";

export let endpoints = {
  brands: "/brands",
  categories: "/categories",
  products: "/products",
  productsSuggest: "/products/suggests",
  register: "/auth/register",
  login: "/auth/authenticate",
  verify: "/auth/verify",
  currentUser: "/auth/current-user",
  refreshToken: "/auth/refresh",
};

const API = () =>
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  });

export default API;
