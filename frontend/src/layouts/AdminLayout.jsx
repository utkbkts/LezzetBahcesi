import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/adminSection/admin/AdminSidebar";
import Navigation from "../components/navigation/Navigation";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { LeftCircleFilled, RightCircleFilled } from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import AdminBottomBar from "../pages/adminSection/admin/AdminBottomBar";

const AdminLayout = () => {
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
              <AdminSidebar />
              <Button
                className="toggle"
                onClick={() => setCollapsed(!collapsed)}
                icon={collapsed ? <RightCircleFilled /> : <LeftCircleFilled />}
              />
            </Sider>
          </div>
        </div>
        <div className="mds:hidden block ">
          <AdminBottomBar />
        </div>
        <div className="w-full text-black mt-12 px-4 mb-12">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
