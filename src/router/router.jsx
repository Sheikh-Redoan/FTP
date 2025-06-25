import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
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
    ],
  },
]);

export default router;
