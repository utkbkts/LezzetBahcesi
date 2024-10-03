import { redirect } from "react-router-dom";
import { userApi } from "../redux/api/UserApi";
import { store } from "../redux/store";

export const AdminLoaders = async (requiredRole) => {
  const p = store.dispatch(userApi.endpoints.getUser.initiate());
  try {
    const response = await p.unwrap();
    const userRole = response.role;
    if (userRole !== requiredRole) {
      return redirect("/");
    }
    return response;
  } catch (error) {
    console.log(error);
    return redirect("/");
  } finally {
    p.unsubscribe();
  }
};
