import { NavLink } from "react-router-dom";
import { navbarLink } from "./Navigation";
import { cn } from "../../utils/TailwindMerge";
import ModalUser from "./ModalUser";
import { Badge } from "antd";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const MobileHeader = ({ setShowBar, showBar, setShowLogin }) => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div className="relative  md:hidden ">
      <div className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 w-full h-full z-[999]"></div>
      <div
        className={cn(
          "fixed h-full w-[250px] md:hidden transition-all duration-500 ease-in-out  top-0 right-0 translate-x-full  z-[9999] bg-white",
          showBar && "-translate-x-0"
        )}
      >
        <div className="flex flex-col items-start justify-center mt-24 gap-4 p-4 ">
          {navbarLink.map((item) => (
            <NavLink
              className="flex items-center gap-4 p-2 text-lg font-medium text-gray-700 hover:bg-gray-200 rounded transition duration-300"
              key={item.id}
              to={item.url}
            >
              {item.icon} <span>{item.label}</span>
            </NavLink>
          ))}
          <div
            className="flex items-center justify-center w-full flex-col gap-2"
            onClick={() => setShowBar(false)}
          >
            <ModalUser setShowLogin={setShowLogin} />
            <NavLink to={"/cart"} className="mt-2">
              <Badge count={cartItems?.length}>
                <IoCartOutline size={35} className=" cursor-pointer" />
              </Badge>
            </NavLink>
          </div>
        </div>
        <div
          className={`hamburger absolute top-[4rem] md:hidden  block right-4 z-50 ${
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

export default MobileHeader;
