import axios from "axios";

export let endpoints = {
  brands: "/brands",
  categories: "/categories",
  products: "/products",
  register: "/auth/register",
  login: "/auth/token",
};

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
});
