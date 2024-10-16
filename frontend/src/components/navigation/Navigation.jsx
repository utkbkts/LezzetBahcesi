import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Modal, Input, Badge } from "antd";
import { useSelector } from "react-redux";

import { IoCartOutline } from "react-icons/io5";
import logo from "/logo.png";
import PropTypes from "prop-types";
import ModalUser from "./ModalUser";
import MobileHeader from "./MobileHeader";
import {
  CircleEllipsis,
  Contact,
  Cylinder,
  Heart,
  LayoutDashboard,
} from "lucide-react";
import Reservation from "../../pages/reservation/ReservationPage";

export const navbarLink = [
  {
    id: 1,
    url: "/",
    label: "Ana Sayfa",
    icon: <LayoutDashboard />,
  },
  {
    id: 2,
    url: "/about",
    label: "Hakkımızda",
    icon: <Cylinder />,
  },
  {
    id: 3,
    url: "/menu",
    label: "Menüler",
    icon: <CircleEllipsis />,
  },
  {
    id: 4,
    url: "/contact",
    label: "İletişim",
    icon: <Contact />,
  },
  {
    id: 5,
    url: "/reservation",
    label: "Rezervasyon",
    icon: <Reservation />,
  },
];

const Navigation = ({ setShowLogin }) => {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { cartItems, favoriteItems } = useSelector((state) => state.cart);
  const [showBar, setShowBar] = useState(false);

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

  const headerClassNames = `fixed w-full bg-white z-[999] shadow-xl h-20 md:h-32 transition-transform duration-300 ${
    isScrollingUp ? "navbar-visible" : "navbar-hidden"
  } ${showBar ? "navbar-visible" : ""} top-0`;

  const shouldShowSearchIcon = location !== "/search";

  return (
    <>
      <header className={headerClassNames}>
        <div className="open-sans flexCenterBetwen container mx-auto h-full relative">
          <Link to={"/"} className="cursor-pointer">
            <img
              className="w-32 h-32 object-cover rounded-full"
              src={logo}
              alt="Logo"
            />
          </Link>
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
            <NavLink to={"/favorite"} className="mt-2">
              <Badge count={favoriteItems?.length}>
                <Heart size={25} className=" cursor-pointer" />
              </Badge>
            </NavLink>
            <ModalUser setShowLogin={setShowLogin} />
          </nav>
        </div>
        <div
          className={`hamburger absolute md:top-[4rem] top-8 md:hidden block right-6 z-50 ${
            showBar ? "active" : ""
          }`}
          onClick={() => setShowBar(!showBar)}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>
      {showBar && (
        <MobileHeader
          showBar={showBar}
          setShowBar={setShowBar}
          setShowLogin={setShowLogin}
        />
      )}

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
  setShowLogin: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
export default Navigation;
