import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const AdminSidebar = ({ adminMenu, showBar }) => {
  const location = useLocation();
  const [activeMenuActive, setActiveMenuActive] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenuActive(menuItemUrl);
  };

  return (
    <div className="w-full h-full pt-4 p-1">
      {!showBar && (
        <h1 className="text-xl font-bold text-white mb-10 text-center">
          Admin Panel
        </h1>
      )}
      <ul className="space-y-2 mt-[10rem]">
        {adminMenu.map((item, index) => (
          <li key={index}>
            <Link
              to={item.url}
              onClick={() => handleMenuItemClick(item.url)}
              className={`block py-2 px-4 rounded-lg transition-colors duration-200 ${
                activeMenuActive === item.url
                  ? "bg-blue-600 text-white "
                  : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {showBar ? <div>{item.icon}</div> : item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

AdminSidebar.propTypes = {
  adminMenu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  showBar: PropTypes.string,
};

export default AdminSidebar;
