import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../pages/adminSection/admin/AdminSidebar";
import Navigation from "../components/navigation/Navigation";
import { useEffect, useState } from "react";
import {
  CirclePlus,
  ClockArrowDown,
  LayoutDashboard,
  MessageSquareDiff,
  NotebookPen,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import { useSelector } from "react-redux";
import Loading from "../components/loading/Loader";

const adminMenu = [
  {
    name: "Ana Sayfa",
    url: "/admin/dashboard",
    icon: <LayoutDashboard size={25} />,
  },
  {
    name: "Yeni Ürün Ekle",
    url: "/admin/addproduct",
    icon: <CirclePlus size={25} />,
  },
  {
    name: "Yeni Kategori Ekle",
    url: "/admin/newcategory",
    icon: <CirclePlus size={25} />,
  },
  { name: "Ürünler", url: "/admin/products", icon: <ShoppingCart size={25} /> },
  {
    name: "Siparişler",
    url: "/admin/orders",
    icon: <ClockArrowDown size={25} />,
  },
  { name: "Kullanıcılar", url: "/admin/users", icon: <UsersRound size={25} /> },
  {
    name: "Yorumlar",
    url: "/admin/reviews",
    icon: <MessageSquareDiff size={25} />,
  },
  {
    name: "Rezervasyon",
    url: "/admin/reservation",
    icon: <NotebookPen size={25} />,
  },
];

const AdminLayout = () => {
  const [showBar, setShowBar] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== "admin") {
      return navigate("/");
    }
  }, [user]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full text-white  h-full mt-[120px]">
      <Navigation />
      <div className="flex">
        <div
          className={`${
            showBar ? "w-16" : "w-1/3"
          } flex items-center overflow-hidden flex-col justify-center min-h-screen bg-gray-800 relative`}
        >
          <AdminSidebar adminMenu={adminMenu} showBar={showBar} />
          <div
            className={`hamburger absolute top-4 right-4 ${
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
