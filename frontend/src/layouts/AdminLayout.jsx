import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/adminSection/admin/AdminSidebar";
import Navigation from "../components/navigation/Navigation";
const adminMenu = [
  { name: "Ana Sayfa", url: "/admin/dashboard" },
  { name: "Yeni Ürün Ekle", url: "/admin/addproduct" },
  { name: "Ürünler", url: "/admin/products" },
  { name: "Siparişler", url: "/admin/orders" },
  { name: "Kullanıcılar", url: "/admin/users" },
  { name: "Yorumlar", url: "/admin/reviews" },
];

const AdminLayout = () => {
  return (
    <div className="w-full text-white  h-full mt-[90px]">
      <Navigation />
      <div className="flex">
        <div className="flex-1 flex items-center flex-col justify-center  bg-gray-800">
          <AdminSidebar adminMenu={adminMenu} />
        </div>
        <div className="flex-[4] text-black mt-12 px-4 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
