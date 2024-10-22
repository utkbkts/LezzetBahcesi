import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../pages/profileSection/user/UserSidebar";
import Navigation from "../components/navigation/Navigation";
import Sider from "antd/es/layout/Sider";
import { Button } from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import UserBottomBar from "../pages/profileSection/user/UserBottomBar";

const UserLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="w-full text-white h-full mt-[120px] overflow-x-hidden">
      <Navigation />
      <div className="flex overflow-x-hidden">
        <div className={`min-h-screen w-auto relative mds:block hidden`}>
          <div className="h-full">
            <Sider
              collapsed={collapsed}
              collapsible
              className="sidebar"
              trigger={null}
            >
              <UserSidebar />
              <Button
                className="toggle"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <RightCircleFilled /> : <LeftCircleFilled />}
              />
            </Sider>
          </div>
        </div>
        <div className="w-full text-black mt-12 px-4 mb-12">
          <Outlet />
        </div>
      </div>
      <div className="mds:hidden block mt-12">
        <UserBottomBar />
      </div>
    </div>
  );
};

export default UserLayout;
