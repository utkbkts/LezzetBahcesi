import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../../../redux/features/socketSlice";

const UserSidebar = ({ userMenu, setShowBar }) => {
  const location = useLocation();
  const [activeMenuActive, setActiveMenuActive] = useState(location.pathname);
  const { message } = useSelector((state) => state.socket);
  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuActive(menuItemUrl);
  };
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setMessage(null));
  };
  return (
    <div className="w-full h-full  p-5">
      <h1 className="text-xl font-bold text-white mb-10 text-center">
        Kullanıcı Paneli
      </h1>
      <ul className="space-y-2 mt-[10rem]">
        {userMenu.map((item, index) => (
          <li key={index}>
            {item.name === "Siparişlerim" ? (
              <Link
                to={item.url}
                onClick={() => {
                  handleMenuItemClick(item.url), handleClick();
                  setShowBar(false);
                }}
                className={`block relative py-2 px-4 rounded-lg transition-colors duration-200 ${
                  activeMenuActive === item.url
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {message && (
                  <div className="absolute z-50 bg-red-500 w-2 h-2 right-4 top-4 rounded-full "></div>
                )}
                {item.name}
              </Link>
            ) : (
              <Link
                to={item.url}
                onClick={() => {
                  handleMenuItemClick(item.url), setShowBar(false);
                }}
                className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${
                  activeMenuActive === item.url
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

UserSidebar.propTypes = {
  userMenu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  setShowBar: PropTypes.func,
};

export default UserSidebar;
