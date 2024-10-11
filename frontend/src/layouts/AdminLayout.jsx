import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/adminSection/admin/AdminSidebar";
import Navigation from "../components/navigation/Navigation";
import { useEffect, useState } from "react";

const adminMenu = [
  {
    name: "Ana Sayfa",
    url: "/admin/dashboard",
  },
  {
    name: "Yeni Ürün Ekle",
    url: "/admin/addproduct",
  },
  {
    name: "Yeni Kategori Ekle",
    url: "/admin/newcategory",
  },
  { name: "Ürünler", url: "/admin/products" },
  {
    name: "Siparişler",
    url: "/admin/orders",
  },
  { name: "Kullanıcılar", url: "/admin/users" },
  {
    name: "Yorumlar",
    url: "/admin/reviews",
  },
  {
    name: "Rezervasyon",
    url: "/admin/reservation",
  },
  {
    name: "Hakkımızda",
    url: "/admin/about",
  },
  {
    name: "Menüler",
    url: "/admin/menu",
  },
];

const AdminLayout = () => {
  const [showBar, setShowBar] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full text-white h-full mt-[120px]">
      <Navigation />
      <div className="flex mds:flex-row flex-col">
        <div className={`relative mds:min-h-screen w-full mds:w-1/5`}>
          <div
            className={`${
              showBar ? "" : "hidden"
            } bg-gray-800 mds:flex flex-col items-center h-full`}
          >
            <AdminSidebar
              adminMenu={adminMenu}
              showBar={showBar}
              setShowBar={setShowBar}
            />
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
        <div className="w-full text-black mt-12 px-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
