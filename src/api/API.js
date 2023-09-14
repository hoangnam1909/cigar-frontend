import axios from "axios";

export let endpoints = {
  brands: "/brands",
  carts: "/carts",
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
};

export let adminEndpoints = {
  brands: "/admin/brands",
  categories: "/admin/categories",
  products: "/admin/products",
  orders: "/admin/orders",
  orderStatuses: "/admin/order-statuses",
  orderStatus: "/admin/order-statuses",
  deliveryCompanies: "/admin/delivery-companies",
};

const API = () =>
  axios.create({
    baseURL: process.env.REACT_APP_BACKEND_DOMAIN,
  });

export default API;
