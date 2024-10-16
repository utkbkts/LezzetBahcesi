import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/adminSection/adminComponent/dashboard/Dashboard";
import Orders from "../pages/adminSection/adminComponent/orders/Orders";
import Products from "../pages/adminSection/adminComponent/products/Products";
import Reviews from "../pages/adminSection/adminComponent/reviews/Reviews";
import AddProduct from "../pages/adminSection/adminComponent/addProduct/AddProduct";
import ListUsers from "../pages/adminSection/adminComponent/listUsers/ListUsers";
import UpdateProduct from "../pages/adminSection/adminComponent/updateProduct/UpdateProduct";

import Reservation from "../pages/adminSection/adminComponent/reservation/Reservation.jsx";
import CategoryProducts from "../pages/adminSection/adminComponent/newCategory/CategoryProducts.jsx";
import { AdminLoaders } from "../loaders/AdminLoaders.jsx";
import MenuPage from "../pages/adminSection/adminComponent/menus/MenuPage.jsx";
import AboutPage from "../pages/adminSection/adminComponent/abouts/AboutPage.jsx";
import FooterPage from "../pages/adminSection/adminComponent/footer/FooterPage.jsx";
export const AdminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  loader: () => AdminLoaders("admin"),
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
    {
      path: "newcategory",
      element: <CategoryProducts />,
    },
    {
      path: "menu",
      element: <MenuPage />,
    },
    {
      path: "about",
      element: <AboutPage />,
    },
    {
      path: "footer",
      element: <FooterPage />,
    },
  ],
};
