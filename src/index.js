import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Maintenance from "./page/maintenance/Maintenance";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {process.env.REACT_APP_MAINTENANCE == 1 ? <Maintenance /> : <App />}
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
