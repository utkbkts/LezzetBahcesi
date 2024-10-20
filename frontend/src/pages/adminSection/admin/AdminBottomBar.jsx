import {
  AccountBookOutlined,
  CustomerServiceFilled,
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
    name: "Ekle",
    icon: <GrAdd />,
    submenu: [
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
    ],
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
    submenu: [
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
    ],
  },
  {
    name: "Bölümler",
    icon: <CustomerServiceFilled />,
    submenu: [
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
    ],
  },
];

const AdminBottomBar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenu(menuItemUrl);
  };

  const toggleSubMenu = (menuName) => {
    setExpandedMenu((prev) => (prev === menuName ? null : menuName));
  };

  return (
    <div className="fixed z-50 bottom-0 bg-[#001529] h-[7vh] w-full sm:px-0 px-4">
      <div className="flex items-center gap-4 justify-center relative">
        {adminMenu.map((item, index) => (
          <div key={index} className="relative">
            <Link to={item.url || "#"}>
              <div
                className={`icon ${activeMenu === item.url ? "active" : ""}`}
                onClick={() => {
                  if (item.submenu) {
                    toggleSubMenu(item.name);
                  } else {
                    handleMenuItemClick(item.url);
                  }
                }}
              >
                {item.icon}
              </div>
            </Link>

            {expandedMenu === item.name && item.submenu && (
              <div className="absolute bottom-full mb-2 bg-[#001529] p-2 rounded shadow-lg w-[150px] -right-4">
                {item.submenu.map((subItem, subIndex) => (
                  <Link to={subItem.url} key={subIndex}>
                    <div
                      className={` ${
                        activeMenu === subItem.url ? "active" : ""
                      } flex items-center gap-2 p-2 rounded hover:bg-gray-700 text-sm `}
                      onClick={() => handleMenuItemClick(subItem.url)}
                    >
                      {subItem.name}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBottomBar;
