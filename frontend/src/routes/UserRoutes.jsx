import Invoice from "../components/invoice/Invoice";
import UserOrderDetail from "../pages/profileSection/userComponent/UserOrderDetail";

import NotFound from "../components/notFound/NotFound";

import Profile from "../pages/profileSection/userComponent/Profile";
import UpdatePassword from "../pages/profileSection/userComponent/UpdatePassword";
import UpdateProfile from "../pages/profileSection/userComponent/UpdateProfile";
import UserReviews from "../pages/profileSection/userComponent/UserReviews";
import UserOrder from "../pages/profileSection/userComponent/UserOrder";
import UserLayout from "../layouts/UserLayout.jsx";

export const UserRoutes = {
  path: "/me",
  element: <UserLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "update_password",
      element: <UpdatePassword />,
    },
    {
      path: "update",
      element: <UpdateProfile />,
    },
    {
      path: "reviews",
      element: <UserReviews />,
    },
    {
      path: "order",
      element: <UserOrder />,
    },
    {
      path: "order/:id",
      element: <UserOrderDetail />,
    },
    {
      path: "invoice/order/:id",
      element: <Invoice />,
    },
  ],
};
