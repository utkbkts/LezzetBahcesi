import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NotFound from "./components/notFound/NotFound";
import HomePage from "./pages/homePage/HomePage";
import AboutPage from "./pages/about/AboutPage";
import MenuPage from "./pages/menu/MenuPage.jsx";
import Search from "./pages/search/Search";
import CartPage from "./pages/cartPage/CartPage";
import Shipping from "./pages/cartPage/Shipping";
import ConfirmOrder from "./pages/cartPage/ConfirmOrder";
import PaymentMethod from "./pages/cartPage/PaymentMethod";
import ProductDetails from "./pages/productDetail/ProductDetails";
import Profile from "./pages/profileSection/userComponent/Profile";
import UpdatePassword from "./pages/profileSection/userComponent/UpdatePassword";
import UpdateProfile from "./pages/profileSection/userComponent/UpdateProfile";
import UserReviews from "./pages/profileSection/userComponent/UserReviews";
import UserOrder from "./pages/profileSection/userComponent/UserOrder";
//admin
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/adminSection/adminComponent/dashboard/Dashboard";
import Orders from "./pages/adminSection/adminComponent/orders/Orders";
import Products from "./pages/adminSection/adminComponent/products/Products";
import Reviews from "./pages/adminSection/adminComponent/reviews/Reviews";
import AddProduct from "./pages/adminSection/adminComponent/addProduct/AddProduct";
import ListUsers from "./pages/adminSection/adminComponent/listUsers/ListUsers";
import UpdateProduct from "./pages/adminSection/adminComponent/updateProduct/UpdateProduct";
import UserLayout from "./layouts/UserLayout";
import Invoice from "./components/invoice/Invoice";
import UserOrderDetail from "./pages/profileSection/userComponent/UserOrderDetail";
import ResetPassword from "./components/resetPassword/ResetPassword.jsx";
import ContactPage from "./pages/contact/ContactPage.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/menu",
          element: <MenuPage />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/shipping",
          element: <Shipping />,
        },
        {
          path: "/confirmOrder",
          element: <ConfirmOrder />,
        },
        {
          path: "/password/reset/:token",
          element: <ResetPassword />,
        },
        {
          path: "/payment_method",
          element: <PaymentMethod />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/me/profile",
          element: <Profile />,
        },
        {
          path: "/me/update_password",
          element: <UpdatePassword />,
        },
        {
          path: "/me/update",
          element: <UpdateProfile />,
        },
        {
          path: "/me/reviews",
          element: <UserReviews />,
        },
        {
          path: "/me/order",
          element: <UserOrder />,
        },
        {
          path: "/me/order/:id",
          element: <UserOrderDetail />,
        },
        {
          path: "/me/invoice/order/:id",
          element: <Invoice />,
        },
      ],
    },
    {
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
      ],
    },
  ]);
  return (
    <React.Fragment>
      <Toaster position="top-right" />
      <div>
        <RouterProvider router={router} />
      </div>
    </React.Fragment>
  );
}

export default App;
