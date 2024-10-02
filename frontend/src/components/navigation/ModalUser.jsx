import { FaUserAlt } from "react-icons/fa";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { GrUserAdmin } from "react-icons/gr";
import { useLogoutMutation } from "../../redux/api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Avatar, Button } from "antd";
import { NavLink } from "react-router-dom";
import { setLogout } from "../../redux/features/userSlice";
const ModalUser = ({ setShowLogin }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await logout();
    dispatch(setLogout());
  };
  return (
    <ul className="flexCenter space-x-8">
      {user ? (
        <div className="flex items-center gap-2  relative">
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
  );
};

export default ModalUser;
