import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Modal, Input, Badge } from "antd";
import { useSelector } from "react-redux";

import { IoCartOutline } from "react-icons/io5";
import logo from "/logo.png";
import PropTypes from "prop-types";
import ModalUser from "./ModalUser";

const navbarLink = [
  {
    id: 1,
    url: "/",
    label: "Ana Sayfa",
  },
  {
    id: 2,
    url: "/about",
    label: "Hakkımızda",
  },
  {
    id: 3,
    url: "/menu",
    label: "Menüler",
  },
  {
    id: 4,
    url: "/contact",
    label: "İletişim",
  },
];

const Navigation = ({ setShowLogin }) => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?query=${encodeURIComponent(searchTerm).trim()}`);
      setIsModalOpen(false);
      setSearchTerm("");
    } else {
      navigate("/");
    }
  };

  const headerClassNames = `fixed w-full bg-white z-50 shadow-xl h-32 transition-all duration-300 ${
    isScrollingUp ? "top-0" : "-top-[50%]"
  }`;

  const shouldShowSearchIcon = location !== "/search";

  return (
    <>
      <header className={headerClassNames}>
        <div className="open-sans flexCenterBetwen container mx-auto h-full">
          <img
            className="w-32 h-32 object-cover rounded-full"
            src={logo}
            alt="Logo"
          />
          <nav className="md:flex hidden items-center gap-6">
            {navbarLink.map((item) => (
              <NavLink
                key={item.id}
                className={`active-header   ${
                  location === item.url ? "text-blue-700" : ""
                }`}
                to={item.url}
              >
                {item.label}
              </NavLink>
            ))}
            {shouldShowSearchIcon && (
              <span onClick={() => setIsModalOpen(true)}>
                <CiSearch className=" cursor-pointer" size={25} />
              </span>
            )}
            <NavLink to={"/cart"} className="mt-2">
              <Badge count={cartItems?.length}>
                <IoCartOutline size={25} className=" cursor-pointer" />
              </Badge>
            </NavLink>
            <ModalUser setShowLogin={setShowLogin} />
          </nav>
        </div>
      </header>

      <Modal
        title="Yemek Çeşidi Ara"
        onOk={handleSearchSubmit}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText="Ara"
        cancelText="İptal"
      >
        <Input
          placeholder="Yemek Çeşidi Ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onPressEnter={handleSearchSubmit}
        />
      </Modal>
    </>
  );
};
Navigation.propTypes = {
  setShowLogin: PropTypes.func,
};
export default Navigation;
