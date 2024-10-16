import NotFound from "../components/notFound/NotFound";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/homePage/HomePage";
import AboutPage from "../pages/about/AboutPage";
import MenuPage from "../pages/menu/MenuPage.jsx";
import Search from "../pages/search/Search";
import CartPage from "../pages/cartPage/CartPage";
import Shipping from "../pages/cartPage/Shipping";
import ConfirmOrder from "../pages/cartPage/ConfirmOrder";
import PaymentMethod from "../pages/cartPage/PaymentMethod";
import ProductDetails from "../pages/productDetail/ProductDetails";
import ResetPassword from "../components/resetPassword/ResetPassword.jsx";
import ContactPage from "../pages/contact/ContactPage.jsx";
import FavoritePage from "../pages/favoritePage/FavoritePage.jsx";
import ReservationPage from "../pages/reservation/ReservationPage.jsx";
export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "about",
      element: <AboutPage />,
    },
    {
      path: "menu",
      element: <MenuPage />,
    },
    {
      path: "search",
      element: <Search />,
    },
    {
      path: "cart",
      element: <CartPage />,
    },
    {
      path: "favorite",
      element: <FavoritePage />,
    },
    {
      path: "contact",
      element: <ContactPage />,
    },
    {
      path: "reservation",
      element: <ReservationPage />,
    },
    {
      path: "shipping",
      element: <Shipping />,
    },
    {
      path: "confirmOrder",
      element: <ConfirmOrder />,
    },
    {
      path: "password/reset/:token",
      element: <ResetPassword />,
    },
    {
      path: "payment_method",
      element: <PaymentMethod />,
    },
    {
      path: "product/:id",
      element: <ProductDetails />,
    },
  ],
};
