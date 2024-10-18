import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import AuthModal from "../pages/auth/AuthModal";
import { useGetUserQuery } from "../redux/api/UserApi";
import Loading from "../components/loading/Loader";
import UserCountDisplay from "../components/userCount/UserCount";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const MainLayout = () => {
  const { isLoading } = useGetUserQuery();
  const { toggleMenu } = useSelector((state) => state.auth);
  const pathname = useLocation().pathname;
  if (isLoading) {
    return <Loading />;
  }
  const starts = pathname.startsWith("/password/reset");

  return (
    <div className="w-full text-white h-full mt-[120px]">
      {!starts && <Navigation />}
      {toggleMenu && <AuthModal />}
      <div className={"w-full flex-grow min-h-screen"}>
        <Outlet />
      </div>
      <div className="w-full mt-auto">
        <Footer />
        <UserCountDisplay />
      </div>
    </div>
  );
};

export default MainLayout;
