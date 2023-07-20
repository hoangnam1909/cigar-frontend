import axios from "axios";

export let endpoints = {
  brands: "/brands",
  categories: "/categories",
  products: "/products",
  register: "/auth/register",
  login: "/auth/token",
};

export default axios.create({
  baseURL: "http://localhost:8080",
});
