import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { endpoints } from "~/api/API";
import { tokenUserRole } from "~/service/AuthService";

export default function AuthPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isError, setIsError] = useState();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let requestBody = {
      username: username,
      password: password,
    };

    try {
      const res = await API().post(endpoints.login, requestBody);
      if (res.status === 200) {
        Cookies.set("accessToken", res.data.token);
        Cookies.set("rememberMe", rememberMe);

        if (tokenUserRole() === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      setIsError(true);
      return;
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="m-auto">
          <form style={{ width: "300px" }} onSubmit={handleSubmitForm}>
            <img
              className="mb-3"
              src="https://res.cloudinary.com/nhn1909/image/upload/v1690041731/ktypjs6ap3ykjv6eydqu.png"
              alt="brand-logo"
              width={300}
            />

            {isError ? (
              <>
                <div className="alert alert-danger" role="alert">
                  Xảy ra lỗi khi đăng nhập
                </div>
              </>
            ) : null}

            <div className="form-floating mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Tên đăng nhập</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Mật khẩu</label>
            </div>

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label">Ghi nhớ đăng nhập</label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
