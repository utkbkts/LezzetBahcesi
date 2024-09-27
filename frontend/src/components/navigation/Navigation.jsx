import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { Modal, Input, Avatar, Badge, Button } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { useLogoutMutation } from "../../redux/api/AuthApi";
import { IoCartOutline } from "react-icons/io5";
import logo from "/logo.png";
import PropTypes from "prop-types";

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
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [logout] = useLogoutMutation();
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleModal = (isOpen) => setIsModalOpen(isOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search?query=${encodeURIComponent(searchTerm).trim()}`);
      toggleModal(false);
      setSearchTerm("");
    } else {
      navigate("/");
    }
  };

  const headerClassNames = `fixed w-full bg-white z-50 shadow-xl h-32 transition-all duration-300 ${
    isScrollingUp ? "top-0" : "-top-[50%]"
  }`;

  const shouldShowSearchIcon = location !== "/search";

  const logoutHandler = async () => {
    await logout();
    navigate(0);
  };

  return (
    <>
      <header className={headerClassNames}>
        <div className="open-sans flexCenterBetwen container mx-auto h-full">
          <img
            className="w-32 h-32 object-cover rounded-full"
            src={logo}
            alt="Logo"
          />
          <nav className="flexCenter gap-6">
            {navbarLink.map((item) => (
              <NavLink
                key={item.id}
                className={`active-header  ${
                  location === item.url ? "text-blue-700" : ""
                }`}
                to={item.url}
              >
                {item.label}
              </NavLink>
            ))}
            {shouldShowSearchIcon && (
              <span onClick={() => toggleModal(true)}>
                <CiSearch className=" cursor-pointer" size={25} />
              </span>
            )}
            <NavLink to={"/cart"} className="mt-2">
              <Badge count={cartItems?.length}>
                <IoCartOutline size={25} className=" cursor-pointer" />
              </Badge>
            </NavLink>
            <ul className="flexCenter space-x-8">
              {user ? (
                <div className="flex items-center gap-2 relative ">
                  <Avatar
                    size={30}
                    icon={<UserOutlined />}
                    onClick={() => setModalVisible(!modalVisible)}
                    className="cursor-pointer flex items-center"
                  />
                  <li className=" cursor-pointer">{user.name}</li>

                  {modalVisible && (
                    <div className="absolute top-14 z-[150] right-0 bg-white h-auto w-[180px] shadow-lg rounded-lg p-3 flex flex-col gap-4">
                      <NavLink
                        onClick={() => setModalVisible(false)}
                        to={"/me/profile"}
                        className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        <FaUserAlt size={20} />
                        <span>Profil</span>
                      </NavLink>
                      {user?.role === "admin" && (
                        <NavLink
                          onClick={() => setModalVisible(false)}
                          to={"/admin/dashboard"}
                          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-600 transition-colors"
                        >
                          <GrUserAdmin size={20} />
                          <span>Admin</span>
                        </NavLink>
                      )}

                      <NavLink
                        onClick={logoutHandler}
                        className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-600 transition-colors"
                        to="/"
                      >
                        <LogoutOutlined />
                        Logout
                      </NavLink>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button
                    type="default"
                    onClick={() => setShowLogin(true)}
                    className="cursor-pointer mt-1"
                  >
                    <UserOutlined />
                    Giriş Yap
                  </Button>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <Modal
        title="Yemek Çeşidi Ara"
        onOk={handleSearchSubmit}
        open={isModalOpen}
        onCancel={() => toggleModal(false)}
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
