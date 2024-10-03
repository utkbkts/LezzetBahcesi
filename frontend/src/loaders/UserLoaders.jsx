import { redirect } from "react-router-dom";
import { store } from "../redux/store";
import { userApi } from "../redux/api/UserApi";
export const UserLoaders = async () => {
  const p = store.dispatch(userApi.endpoints.getUser.initiate());
  try {
    const response = await p.unwrap();
    //dispatch içini açıyoruz hata durumunu ele alıyoruz
    return response;
  } catch (err) {
    console.log(err);
    return redirect("/");
  } finally {
    p.unsubscribe();
    //manuel olarak cache yönetimini iptal ediyoruz
  }
};
