import { useEffect } from "react";
import { useGetAllProductsQuery } from "../../redux/api/ProductApi";
import Loading from "../../components/loading/Loader";
import MenuItem from "../../components/menuItem/MenuItem";
import Title from "../../ui/Title";
import Hero from "../../components/hero/Hero";
import appbg from "/food/app-bg.png";
const MenuPage = () => {
  const { data, isLoading } = useGetAllProductsQuery();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen mt-[100px]">
      <Hero title={"Menülerimiz"} />
      <img src={appbg} alt="" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center">
        <div className="mb-12">
          <Title title="Menülerimiz" titleSub="Dünya mutfaklarımız" />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-3 gap-12">
            {data?.products?.map((product) => {
              return <MenuItem key={product._id} {...product} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
