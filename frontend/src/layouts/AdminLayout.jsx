import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/adminSection/admin/AdminSidebar";
import Navigation from "../components/navigation/Navigation";
import { useState } from "react";
import { ShoppingCart, UsersRound } from "lucide-react";

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
  { name: "Ürünler", url: "/admin/products", icon: <ShoppingCart size={25} /> },
  {
    name: "Siparişler",
    url: "/admin/orders",
  },
  { name: "Kullanıcılar", url: "/admin/users", icon: <UsersRound size={25} /> },
  {
    name: "Yorumlar",
    url: "/admin/reviews",
  },
  {
    name: "Rezervasyon",
    url: "/admin/reservation",
  },
];

const AdminLayout = () => {
  const [showBar, setShowBar] = useState(false);

  return (
    <div className="w-full text-white h-full mt-[120px]">
      <Navigation />
      <div className="flex mds:flex-row flex-col">
        <div className={`relative mds:min-h-screen w-full mds:w-1/3`}>
          <div
            className={`${
              showBar ? "" : " hidden"
            } bg-gray-800 mds:flex flex-col items-center min-h-screen`}
          >
            <AdminSidebar adminMenu={adminMenu} showBar={showBar} />
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
