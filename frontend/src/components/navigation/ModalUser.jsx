import { FaUserAlt } from "react-icons/fa";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { GrUserAdmin } from "react-icons/gr";
import { useLogoutMutation } from "../../redux/api/AuthApi";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Avatar, Badge, Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const ModalUser = ({ setShowLogin }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.socket);
  const outSideRef = useRef();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate(0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (outSideRef.current && !outSideRef.current.contains(event.target)) {
        setModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outSideRef]);

  return (
    <ul className="flexCenter space-x-8">
      {user ? (
        <div className="flex items-center gap-2  ">
          <div className="relative">
            <Avatar
              size={30}
              icon={<UserOutlined />}
              onClick={() => setModalVisible(!modalVisible)}
              className="cursor-pointer flex items-center"
            />
            {message && (
              <Badge count={1} className="absolute -top-4 -right-2" />
            )}
          </div>
          <li className="cursor-pointer">{user.name}</li>
          {modalVisible && (
            <div
              ref={outSideRef}
              className="absolute top-32 z-[150] -right-12 bg-white h-auto w-[180px] shadow-lg  p-3 flex flex-col gap-4"
            >
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
  );
};

ModalUser.propTypes = {
  setShowLogin: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

export default ModalUser;
