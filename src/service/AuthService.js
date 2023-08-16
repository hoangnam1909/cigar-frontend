import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { parseJwt } from "~/utils/JwtUtil";

export const verifyToken = () => {
  let accessToken = Cookies.get("accessToken");
  if (accessToken == null) {
    return false;
  }

  const jwt = jwtDecode(accessToken);
  return new Date(jwt.exp * 1000 - 10 * 60 * 1000) > new Date();
};

export const isTokenExpired = () => {
  let accessToken = Cookies.get("accessToken");
  const jwt = jwtDecode(accessToken);

  return new Date(jwt.exp * 1000 - 10 * 60 * 1000) < new Date();
};

export const tokenUserRole = () => {
  let payload = parseJwt(Cookies.get("accessToken"));

  if (!verifyToken()) {
    return null;
  }

  if (payload != null) {
    return payload.role;
  }

  return null;
};
