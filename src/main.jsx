import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router/router";
import { SvgProvider } from "./context/SvgContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SvgProvider>
      <RouterProvider router={router} />
    </SvgProvider>
  </StrictMode>
);
