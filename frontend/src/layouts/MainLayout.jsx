import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import { useState } from "react";
import AuthModal from "../pages/auth/AuthModal";
import { useGetUserQuery } from "../redux/api/UserApi";
import Loading from "../components/loading/Loader";

const MainLayout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { data, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full text-white h-full mt-[120px]">
      <Navigation setShowLogin={setShowLogin} />
      {showLogin && (
        <AuthModal showLogin={showLogin} setShowLogin={setShowLogin} />
      )}
      <div className={"w-full  min-h-screen "}>
        <Outlet />
      </div>
      <div className="w-full mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
