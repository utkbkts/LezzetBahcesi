import React, { Suspense } from "react";
import { UserLoaders } from "../loaders/UserLoaders";
import Loading from "../components/loading/Loader";

const Invoice = React.lazy(() => import("../components/invoice/Invoice"));
const UserOrderDetail = React.lazy(() =>
  import("../pages/profileSection/userComponent/UserOrderDetail")
);

const NotFound = React.lazy(() => import("../components/notFound/NotFound"));

const Profile = React.lazy(() =>
  import("../pages/profileSection/userComponent/Profile")
);
const UpdatePassword = React.lazy(() =>
  import("../pages/profileSection/userComponent/UpdatePassword")
);
const UpdateProfile = React.lazy(() =>
  import("../pages/profileSection/userComponent/UpdateProfile")
);
const UserReviews = React.lazy(() =>
  import("../pages/profileSection/userComponent/UserReviews")
);
const UserOrder = React.lazy(() =>
  import("../pages/profileSection/userComponent/UserOrder")
);
const UserLayout = React.lazy(() => import("../layouts/UserLayout"));

export const UserRoutes = {
  path: "/me",
  element: (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <UserLayout />
    </Suspense>
  ),
  errorElement: <NotFound />,
  loader: () => UserLoaders(),
  children: [
    {
      path: "profile",
      element: (
        <Suspense fallback={<Loading />}>
          <Profile />
        </Suspense>
      ),
    },
    {
      path: "update_password",
      element: (
        <Suspense fallback={<Loading />}>
          <UpdatePassword />
        </Suspense>
      ),
    },
    {
      path: "update",
      element: (
        <Suspense fallback={<Loading />}>
          <UpdateProfile />
        </Suspense>
      ),
    },
    {
      path: "reviews",
      element: (
        <Suspense fallback={<Loading />}>
          <UserReviews />
        </Suspense>
      ),
    },
    {
      path: "order",
      element: (
        <Suspense fallback={<Loading />}>
          <UserOrder />
        </Suspense>
      ),
    },
    {
      path: "order/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <UserOrderDetail />
        </Suspense>
      ),
    },
    {
      path: "invoice/order/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <Invoice />
        </Suspense>
      ),
    },
  ],
};
