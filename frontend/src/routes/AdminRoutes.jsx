import React, { Suspense } from "react";
import Loading from "../components/loading/Loader.jsx";
import { AdminLoaders } from "../loaders/AdminLoaders";

const AdminLayout = React.lazy(() => import("../layouts/AdminLayout"));
const Dashboard = React.lazy(() =>
  import("../pages/adminSection/adminComponent/dashboard/Dashboard")
);
const Orders = React.lazy(() =>
  import("../pages/adminSection/adminComponent/orders/Orders")
);
const Products = React.lazy(() =>
  import("../pages/adminSection/adminComponent/products/Products")
);
const Reviews = React.lazy(() =>
  import("../pages/adminSection/adminComponent/reviews/Reviews")
);
const AddProduct = React.lazy(() =>
  import("../pages/adminSection/adminComponent/addProduct/AddProduct")
);
const ListUsers = React.lazy(() =>
  import("../pages/adminSection/adminComponent/listUsers/ListUsers")
);
const UpdateProduct = React.lazy(() =>
  import("../pages/adminSection/adminComponent/updateProduct/UpdateProduct")
);
const Reservation = React.lazy(() =>
  import("../pages/adminSection/adminComponent/reservation/Reservation")
);
const CategoryProducts = React.lazy(() =>
  import("../pages/adminSection/adminComponent/newCategory/CategoryProducts")
);
const MenuPage = React.lazy(() =>
  import("../pages/adminSection/adminComponent/menus/MenuPage")
);
const AboutPage = React.lazy(() =>
  import("../pages/adminSection/adminComponent/abouts/AboutPage")
);
const FooterPage = React.lazy(() =>
  import("../pages/adminSection/adminComponent/footer/FooterPage")
);

export const AdminRoutes = {
  path: "/admin",
  element: (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <AdminLayout />
    </Suspense>
  ),
  loader: () => AdminLoaders("admin"),
  children: [
    {
      path: "dashboard",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Dashboard />
        </Suspense>
      ),
    },
    {
      path: "orders",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Orders />
        </Suspense>
      ),
    },
    {
      path: "products",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Products />
        </Suspense>
      ),
    },
    {
      path: "reviews",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Reviews />
        </Suspense>
      ),
    },
    {
      path: "addproduct",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <AddProduct />
        </Suspense>
      ),
    },
    {
      path: "users",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <ListUsers />
        </Suspense>
      ),
    },
    {
      path: "products/:id",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <UpdateProduct />
        </Suspense>
      ),
    },
    {
      path: "reservation",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Reservation />
        </Suspense>
      ),
    },
    {
      path: "newcategory",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <CategoryProducts />
        </Suspense>
      ),
    },
    {
      path: "menu",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <MenuPage />
        </Suspense>
      ),
    },
    {
      path: "about",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <AboutPage />
        </Suspense>
      ),
    },
    {
      path: "footer",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <FooterPage />
        </Suspense>
      ),
    },
  ],
};
