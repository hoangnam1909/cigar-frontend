import axios from "axios";

export let endpoints = {
  brands: "/brands",
  categories: "/categories",
  products: "/products",
  productsSuggest: "/products/suggests",
  countProductsOnSale: "/products/count-product-on-sale",
  register: "/auth/register",
  login: "/auth/authenticate",
  verify: "/auth/verify",
  currentUser: "/auth/current-user",
  refreshToken: "/auth/refresh",
  customer: "/customers",
  order: "/orders",
  trackingOrder: "/orders/tracking",
  orderStatus: "/order-statuses",
};

const API = () =>
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  });

export default API;
