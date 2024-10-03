import { createBrowserRouter } from "react-router-dom";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { MainRoutes } from "./MainRoutes";

export const router = createBrowserRouter([
  UserRoutes,
  AdminRoutes,
  MainRoutes,
]);
