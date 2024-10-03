import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../pages/profileSection/user/UserSidebar";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";

const userMenu = [
  { name: "Profil", url: "/me/profile" },
  { name: "Profil Güncelle", url: "/me/update" },
  { name: "Parola Değiştir", url: "/me/update_password" },
  { name: "Yorumlarım", url: "/me/reviews" },
  { name: "Siparişlerim", url: "/me/order" },
];

const UserLayout = () => {
  const [setShowLogin] = useState(false);

  return (
    <div className="w-full text-white h-full mt-[120px]">
      <Navigation setShowLogin={setShowLogin} />
      <div className={"flex"}>
        <div className="flex-1 flex items-center  flex-col justify-center  min-h-screen bg-gray-800">
          <UserSidebar userMenu={userMenu} />
        </div>
        <div className={"flex-[4]  min-h-screen text-black"}>
          <Outlet />
        </div>
      </div>
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
