import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { File, Key, ListOrdered, User } from "lucide-react";
import { GrUpdate } from "react-icons/gr";
import "../../adminSection/admin/Sidebar.css";

const userMenu = [
  { name: "Profil", url: "/me/profile", icon: <User /> },
  { name: "Profil Güncelle", url: "/me/update", icon: <GrUpdate /> },
  { name: "Parola Değiştir", url: "/me/update_password", icon: <Key /> },
  { name: "Yorumlarım", url: "/me/reviews", icon: <File /> },
  { name: "Siparişlerim", url: "/me/order", icon: <ListOrdered /> },
];
const UserBottomBar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const handleMenuItemClick = (menuItemUrl) => {
    setActiveMenu(menuItemUrl);
  };

  return (
    <div className="fixed z-50 bottom-0 bg-[#001529] h-[7vh] w-full sm:px-0 px-4 ">
      <div className="flex items-center gap-4 justify-center relative">
        {userMenu.map((item, index) => (
          <div key={index} className="relative">
            <Link to={item.url || "#"}>
              <div
                className={`icon ${activeMenu === item.url ? "active" : ""}`}
                onClick={() => {
                  handleMenuItemClick(item.url);
                }}
              >
                {item.icon}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBottomBar;
