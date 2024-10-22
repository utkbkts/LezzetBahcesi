/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, Menu } from "antd";
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
const AdminSidebar = () => {
  const location = useLocation();
  const [activeMenuActive, setActiveMenuActive] = useState(location.pathname);
  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuActive(menuItemUrl);
  };

  return (
    <Menu theme="dark" className="min-h-screen" mode="inline">
      {adminMenu.map((item) =>
        item.submenu ? (
          <Menu.SubMenu key={item.name} title={item.name} icon={item.icon}>
            {item.submenu.map((subItem) => (
              <Menu.Item
                className={`${
                  activeMenuActive === item.url ? "bg-blue-500" : ""
                }`}
                key={subItem.url}
                onClick={() => handleMenuItemClick(subItem.url)}
              >
                <Link to={subItem.url}>{subItem.name}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={item.url}
            icon={item.icon}
            onClick={() => handleMenuItemClick(item.url)}
          >
            <Link to={item.url}>{item.name}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
};

AdminSidebar.propTypes = {
  adminMenu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  showBar: PropTypes.bool,
  setShowBar: PropTypes.func,
};

export default AdminSidebar;
