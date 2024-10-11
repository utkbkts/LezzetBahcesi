import { useEffect, useState } from "react";
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
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full text-white h-full mt-[120px]">
      <Navigation setShowLogin={setShowLogin} />
      <div className={"flex mds:flex-row flex-col"}>
        <div className={`relative mds:min-h-screen w-full mds:w-1/5`}>
          <div
            className={`${
              showBar ? "" : " hidden"
            } bg-gray-800 mds:flex flex-col items-center h-full`}
          >
            <UserSidebar userMenu={userMenu} setShowBar={setShowBar} />
          </div>
          <div
            className={`hamburger absolute top-4 mds:hidden block right-4 z-50 ${
              showBar ? "active" : ""
            }`}
            onClick={() => setShowBar(!showBar)}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
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
