import GeneralInformation from "@/components/DashboardHomeComponentes/GeneralInformation";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import GlobalLibraryDetails from "@/components/GlobalLibraryComponents/GlobalLibraryDetails";
import Favorites from "@/components/SessionComoinents/Favorites";
import Edit from "@/components/TeamManagementCompoentes/PitchMastersComponentes/Edit";
import PitchMasters from "@/components/TeamManagementCompoentes/PitchMastersComponentes/PitchMasters";
import AuthLayout from "@/layouts/AuthLayout"; // ✅ Corrected path
import CreatorToolAuth from "@/layouts/CreatorToolAuth"; // ✅ Corrected path
import DashboardLayout from "@/layouts/DashboardLayout"; // ✅ Corrected path
import CommonLayout from "../layouts/CommonLayout";
import SignIn from "@/pages/auth/SignIn";
import SignUp from "@/pages/auth/SignUp";
import QuickAccess from "@/pages/CreatorToolPages/QuickAccess/QuickAccess";
import SwitchCreator from "@/pages/CreatorToolPages/SwitchCreator/SwitchCreator";
import CreatorToolPages from "../pages/CreatorToolPages/CreatorToolPages"
import DashboardHome from "@/pages/dashboard/DashboardHome";
import GamePlan from "@/pages/GamePlan/GamePlan";
import GlobalLibrary from "@/pages/GlobalLibrary/GlobalLibrary";
import Home from "@/pages/Home/Home";
import Practice from "@/pages/Practice/Practice";
import Session from "@/pages/Session/Session";
import SubscriptionPlan from "@/pages/SubscriptionPlan/SubscriptionPlan";
import TeamManagement from "@/pages/TeamManagement/TeamManagement";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/CreatorTool",
    element: <CommonLayout/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/CreatorTool/switchCreator",
        element: <CreatorToolPages />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/auth/signUp",
        element: <SignUp />,
      },
      {
        path: "/auth/SignIn",
        element: <SignIn />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/dashboard/dashboardHome", element: <DashboardHome /> },
      { path: "/dashboard/team-management", element: <TeamManagement /> },
      {
        path: "/dashboard/dashboardHome/GeneralInformation",
        element: <GeneralInformation />,
      },
      {
        path: "/dashboard/team-management/pitchMasters",
        element: <PitchMasters />,
      },
      { path: "/dashboard/team-management/Edit", element: <Edit /> },

      { path: "/dashboard/Practice", element: <Practice /> },
      { path: "/dashboard/Session", element: <Session /> },
      { path: "/dashboard/Session/Favorite", element: <Favorites /> },
      { path: "/dashboard/game-plan", element: <GamePlan /> },
      { path: "/dashboard/globalLibrary", element: <GlobalLibrary /> },
      {
        path: "/dashboard/globalLibrary/GlobalLibraryDetails",
        element: <GlobalLibraryDetails />,
      },

      { path: "/dashboard/subscriptionPlan", element: <SubscriptionPlan /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
