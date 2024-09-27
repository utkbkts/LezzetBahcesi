import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/AuthApi";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import { userApi } from "./api/UserApi";
import { productApi } from "./api/ProductApi";
import { orderApi } from "./api/OrderApi";
import { analyticApi } from "./api/AnalyticApi";
export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [analyticApi.reducerPath]: analyticApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      analyticApi.middleware,
    ]),
});
