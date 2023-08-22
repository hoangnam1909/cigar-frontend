import { useEffect } from "react";
import { useState } from "react";
import jwt_decode from "jwt-decode";

export default function JWT() {
  const [token, setToken] = useState("");

  useEffect(() => {
    let decodedToken = jwt_decode(token);
    console.log("Decoded Token", decodedToken);
    let currentDate = new Date();

    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      console.log("Token expired.");
    } else {
      console.log("Valid token");
    }
  }, [token]);

  return (
    <>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          className="form-control"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
          }}
        />
      </div>
    </>
  );
}
