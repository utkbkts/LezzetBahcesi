import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/adminSection/adminComponent/dashboard/Dashboard";
import Orders from "../pages/adminSection/adminComponent/orders/Orders";
import Products from "../pages/adminSection/adminComponent/products/Products";
import Reviews from "../pages/adminSection/adminComponent/reviews/Reviews";
import AddProduct from "../pages/adminSection/adminComponent/addProduct/AddProduct";
import ListUsers from "../pages/adminSection/adminComponent/listUsers/ListUsers";
import UpdateProduct from "../pages/adminSection/adminComponent/updateProduct/UpdateProduct";

import Reservation from "../pages/adminSection/adminComponent/reservation/Reservation.jsx";
export const AdminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "orders",
      element: <Orders />,
    },
    {
      path: "products",
      element: <Products />,
    },
    {
      path: "reviews",
      element: <Reviews />,
    },
    {
      path: "addproduct",
      element: <AddProduct />,
    },
    {
      path: "users",
      element: <ListUsers />,
    },
    {
      path: "products/:id",
      element: <UpdateProduct />,
    },
    {
      path: "reservation",
      element: <Reservation />,
    },
  ],
};
