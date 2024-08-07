import "./tailwind.css";
import "@sakun/system.css";
import "./index.css";
// deps
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import { PageRoutes } from "./route";
import { SideBar } from "./components/SideBar";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex">
        <SideBar />
        <div className="flex-1 m-4 ml-0">
          <PageRoutes />
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
