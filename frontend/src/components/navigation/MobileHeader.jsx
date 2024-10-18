import { NavLink, useNavigate } from "react-router-dom";
import { navbarLink } from "./Navigation";
import { cn } from "../../utils/TailwindMerge";
import { Avatar, Badge, Button } from "antd";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLogoutMutation } from "../../redux/api/AuthApi";
import PropTypes from "prop-types";
import { setToggleMenu } from "../../redux/features/userSlice";
const MobileHeader = ({ setShowBar, showBar }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await logout();
    navigate(0);
  };

  return (
    <div className="relative  mds:hidden ">
      <div className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 w-full h-full z-[999]"></div>
      <div
        className={cn(
          "fixed h-full w-[250px] mds:hidden transition-all duration-500 ease-in-out  top-0 right-0 translate-x-full  z-[9999] bg-white",
          showBar && "-translate-x-0"
        )}
      >
        <div className="flex flex-col items-start justify-center mt-24 gap-4 p-4 ">
          {navbarLink.map((item) => (
            <NavLink
              onClick={() => setShowBar(false)}
              className="flex items-center gap-4 p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded transition duration-300"
              key={item.id}
              to={item.url}
            >
              {item.icon} <span>{item.label}</span>
            </NavLink>
          ))}
          <div className="flex items-center justify-center w-full flex-col gap-6 p-6   transition duration-300 ease-in-out">
            {user && (
              <div className="flex items-center gap-4">
                <Avatar
                  size={40}
                  icon={<UserOutlined />}
                  className="cursor-pointer transition-transform transform hover:scale-125 border-2 border-blue-500 rounded-full shadow-sm"
                  onClick={() => setOpenModal(!openModal)}
                />
                <button className="flex items-center justify-center text-black">
                  {openModal ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronUp size={20} />
                  )}
                </button>
              </div>
            )}

            {openModal && user && (
              <div className="flex flex-col gap-4 w-full rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out">
                <div className="flex flex-col items-start gap-2">
                  <NavLink
                    onClick={() => setShowBar(false)}
                    to={"/me/profile"}
                    className="flex items-center gap-3 cursor-pointer text-gray-800 hover:text-blue-600 transition-colors py-2 px-3 hover:bg-gray-100"
                  >
                    <FaUserAlt size={22} className="text-gray-600" />
                    <span className="font-semibold">Profil</span>
                  </NavLink>
                  {user?.role === "admin" && (
                    <NavLink
                      onClick={() => setShowBar(false)}
                      to={"/admin/dashboard"}
                      className="flex items-center gap-3 cursor-pointer text-gray-800 hover:text-green-600 transition-colors py-2 px-3 hover:bg-gray-100"
                    >
                      <GrUserAdmin size={22} className="text-gray-600" />
                      <span className="font-semibold">Admin</span>
                    </NavLink>
                  )}
                  <NavLink
                    onClick={logoutHandler}
                    className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-600 py-2 px-3 transition-colors"
                    to="/"
                  >
                    <LogoutOutlined size={22} />
                    Logout
                  </NavLink>
                </div>
              </div>
            )}
            {!user && (
              <Button
                type="default"
                onClick={() => {
                  dispatch(setToggleMenu());
                  setShowBar(false);
                }}
                className="cursor-pointer mt-1"
              >
                <UserOutlined />
                Giriş Yap
              </Button>
            )}
            <NavLink
              onClick={() => setShowBar(false)}
              to={"/cart"}
              className="mt-4"
            >
              <Badge
                count={cartItems?.length}
                className="bg-blue-600  text-white rounded-full"
              >
                <IoCartOutline
                  size={40}
                  className="cursor-pointer transition-transform transform hover:scale-125  p-1"
                />
              </Badge>
            </NavLink>
          </div>
        </div>
        <div
          className={`hamburger absolute top-[4rem] mds:hidden  block right-6 z-50 ${
            showBar ? "active " : ""
          }`}
          onClick={() => setShowBar(!showBar)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </div>
  );
};
MobileHeader.propTypes = {
  setShowBar: PropTypes.func.isRequired,
  showBar: PropTypes.bool.isRequired,
};
export default MobileHeader;
