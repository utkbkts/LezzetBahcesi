import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../redux/features/socketSlice";
import { Menu } from "antd";
import { File, Key, ListOrdered, User } from "lucide-react";
import { GrUpdate } from "react-icons/gr";
const userMenu = [
  { name: "Profil", url: "/me/profile", icon: <User size={20} /> },
  { name: "Profil Güncelle", url: "/me/update", icon: <GrUpdate size={20} /> },
  {
    name: "Parola Değiştir",
    url: "/me/update_password",
    icon: <Key size={20} />,
  },
  { name: "Yorumlarım", url: "/me/reviews", icon: <File size={20} /> },
  { name: "Siparişlerim", url: "/me/order", icon: <ListOrdered size={20} /> },
];

const UserSidebar = () => {
  const { message } = useSelector((state) => state.socket);
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuItem(menuItemUrl);
  };

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setMessage(null));
  };

  return (
    <Menu
      theme="dark"
      className="flex flex-col items-center text-[1rem] min-h-screen mt-20"
      mode="inline"
    >
      {userMenu.map((item) => {
        return item.name === "Siparişlerim" ? (
          <Menu.Item
            key={item.url}
            className={`${activeMenuItem === item.url ? "bg-blue-700" : ""}`}
            icon={item.icon ? item.icon : null}
            onClick={() => {
              handleMenuItemClick(item.url);
              handleClick();
            }}
          >
            {message && (
              <span className="absolute rounded-full bg-blue-500 h-4 w-4 right-2 top-2"></span>
            )}
            <Link to={item.url}>{item.name}</Link>
          </Menu.Item>
        ) : (
          <Menu.Item
            key={item.url}
            className={`${activeMenuItem === item.url ? "bg-blue-700" : ""}`}
            icon={item.icon ? item.icon : null}
            onClick={() => {
              handleMenuItemClick(item.url);
              handleClick();
            }}
          >
            <Link to={item.url}>{item.name}</Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

UserSidebar.propTypes = {
  userMenu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
};

export default UserSidebar;
