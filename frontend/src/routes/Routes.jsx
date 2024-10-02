import { createBrowserRouter } from "react-router-dom";
import { UserRoutes } from "./UserRoutes";
import { AdminRoutes } from "./AdminRoutes";

export const router = createBrowserRouter([UserRoutes, AdminRoutes]);
