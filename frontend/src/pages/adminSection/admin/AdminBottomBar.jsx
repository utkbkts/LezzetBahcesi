import {
  AccountBookOutlined,
  DashboardFilled,
  MenuFoldOutlined,
  ProductFilled,
  RedEnvelopeFilled,
} from "@ant-design/icons";
import { GrAdd, GrOrderedList } from "react-icons/gr";
import { NewspaperIcon, Users } from "lucide-react";
import { FaRegUser } from "react-icons/fa";
import { IoFootsteps } from "react-icons/io5";
import "./Sidebar.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
const adminMenu = [
  {
    name: "Ana Sayfa",
    url: "/admin/dashboard",
    icon: <DashboardFilled />,
  },
  {
    name: "Yeni Kategori Ekle",
    url: "/admin/newcategory",
    icon: <NewspaperIcon />,
  },
  {
    name: "Yeni Ürün Ekle",
    url: "/admin/addproduct",
    icon: <GrAdd />,
  },

  { name: "Ürünler", url: "/admin/products", icon: <ProductFilled /> },
  {
    name: "Siparişler",
    url: "/admin/orders",
    icon: <GrOrderedList />,
  },
  {
    name: "Kullanıcılar",
    url: "/admin/users",
    icon: <Users />,
  },
  {
    name: "Yorumlar",
    url: "/admin/reviews",
    icon: <RedEnvelopeFilled />,
  },
  {
    name: "Rezervasyonlar",
    url: "/admin/reservation",
    icon: <FaRegUser />,
  },
  {
    name: "Hakkımızda",
    url: "/admin/about",
    icon: <AccountBookOutlined />,
  },
  {
    name: "Menüler",
    url: "/admin/menu",
    icon: <MenuFoldOutlined />,
  },

  {
    name: "Footer",
    url: "/admin/footer",
    icon: <IoFootsteps />,
  },
];

const AdminBottomBar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenu(menuItemUrl);
  };

  return (
    <div className="fixed z-50 bottom-0 bg-[#001529] h-[5vh] w-full">
      <div className="flex items-center gap-4 justify-center p-2">
        {adminMenu.map((item, index) => (
          <Link to={item.url || "#"} key={index}>
            <div
              className={`icon ${activeMenu === item.url ? "active" : ""}`}
              onClick={() => handleMenuItemClick(item.url)}
            >
              {item.icon}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminBottomBar;
