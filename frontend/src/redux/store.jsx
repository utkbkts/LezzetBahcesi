import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/AuthApi";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import socketReducer from "./features/socketSlice";
import { userApi } from "./api/UserApi";
import { productApi } from "./api/ProductApi";
import { orderApi } from "./api/OrderApi";
import { analyticApi } from "./api/AnalyticApi";
import { contactApi } from "./api/ContactApi";
import { reservationApi } from "./api/ReservationApi";
import { categoryApi } from "./api/CategoryApi";
export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    socket: socketReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [analyticApi.reducerPath]: analyticApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [reservationApi.reducerPath]: reservationApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      analyticApi.middleware,
      contactApi.middleware,
      reservationApi.middleware,
      categoryApi.middleware,
    ]),
});
