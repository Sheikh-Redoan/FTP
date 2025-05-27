import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import CommonLayout from "../layouts/CommonLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/about",
        element: <About/>,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <div>Your element name</div>,
  },
]);

export default router;
