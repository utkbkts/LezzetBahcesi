import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../redux/features/socketSlice";
import { Menu } from "antd";
import { File, Key, ListOrdered, User } from "lucide-react";
import { GrUpdate } from "react-icons/gr";
const userMenu = [
  { name: "Profil", url: "/me/profile", icon: <User /> },
  { name: "Profil Güncelle", url: "/me/update", icon: <GrUpdate /> },
  { name: "Parola Değiştir", url: "/me/update_password", icon: <Key /> },
  { name: "Yorumlarım", url: "/me/reviews", icon: <File /> },
  { name: "Siparişlerim", url: "/me/order", icon: <ListOrdered /> },
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
    <Menu theme="dark" className="menu-bar min-h-screen" mode="inline">
      {userMenu.map((item) => (
        <Menu.Item
          key={item.url}
          icon={item.icon ? item.icon : null}
          onClick={() => {
            handleMenuItemClick(item.url);
            handleClick();
          }}
        >
          <Link to={item.url}>{item.name}</Link>
        </Menu.Item>
      ))}
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
