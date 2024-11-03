import React, { Suspense } from "react";
import Loading from "../components/loading/Loader";

const NotFound = React.lazy(() => import("../components/notFound/NotFound"));
const MainLayout = React.lazy(() => import("../layouts/MainLayout"));
const HomePage = React.lazy(() => import("../pages/homePage/HomePage"));
const AboutPage = React.lazy(() => import("../pages/about/AboutPage"));
const MenuPage = React.lazy(() => import("../pages/menu/MenuPage"));
const Search = React.lazy(() => import("../pages/search/Search"));
const CartPage = React.lazy(() => import("../pages/cartPage/CartPage"));
const Shipping = React.lazy(() => import("../pages/cartPage/Shipping"));
const ConfirmOrder = React.lazy(() => import("../pages/cartPage/ConfirmOrder"));
const PaymentMethod = React.lazy(() =>
  import("../pages/cartPage/PaymentMethod")
);
const ProductDetails = React.lazy(() =>
  import("../pages/productDetail/ProductDetails")
);
const ResetPassword = React.lazy(() =>
  import("../components/resetPassword/ResetPassword")
);
const ContactPage = React.lazy(() => import("../pages/contact/ContactPage"));
const FavoritePage = React.lazy(() =>
  import("../pages/favoritePage/FavoritePage")
);
const ReservationPage = React.lazy(() =>
  import("../pages/reservation/ReservationPage")
);
const SuccessPage = React.lazy(() =>
  import("../pages/payment/success/SuccessPage")
);

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <HomePage />
        </Suspense>
      ),
    },
    {
      path: "about",
      element: (
        <Suspense fallback={<Loading />}>
          <AboutPage />
        </Suspense>
      ),
    },
    {
      path: "menu",
      element: (
        <Suspense fallback={<Loading />}>
          <MenuPage />
        </Suspense>
      ),
    },
    {
      path: "search",
      element: (
        <Suspense fallback={<Loading />}>
          <Search />
        </Suspense>
      ),
    },
    {
      path: "cart",
      element: (
        <Suspense fallback={<Loading />}>
          <CartPage />
        </Suspense>
      ),
    },
    {
      path: "favorite",
      element: (
        <Suspense fallback={<Loading />}>
          <FavoritePage />
        </Suspense>
      ),
    },
    {
      path: "contact",
      element: (
        <Suspense fallback={<Loading />}>
          <ContactPage />
        </Suspense>
      ),
    },
    {
      path: "reservation",
      element: (
        <Suspense fallback={<Loading />}>
          <ReservationPage />
        </Suspense>
      ),
    },
    {
      path: "shipping",
      element: (
        <Suspense fallback={<Loading />}>
          <Shipping />
        </Suspense>
      ),
    },
    {
      path: "confirmOrder",
      element: (
        <Suspense fallback={<Loading />}>
          <ConfirmOrder />
        </Suspense>
      ),
    },
    {
      path: "password/reset/:token",
      element: (
        <Suspense fallback={<Loading />}>
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: "payment_method",
      element: (
        <Suspense fallback={<Loading />}>
          <PaymentMethod />
        </Suspense>
      ),
    },
    {
      path: "product/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <ProductDetails />
        </Suspense>
      ),
    },
    {
      path: "payment/success",
      element: (
        <Suspense fallback={<Loading />}>
          <SuccessPage />
        </Suspense>
      ),
    },
  ],
};
