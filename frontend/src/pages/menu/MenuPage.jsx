import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loader";
import MenuItem from "../../components/menuItem/MenuItem";
import Title from "../../ui/Title";
import Hero from "../../components/hero/Hero";
import appbg from "/food/app-bg.png";
import { useProductGetCategoryAllQuery } from "../../redux/api/ProductApi";
import { Button } from "antd";
const MenuPage = () => {
  const { data, isLoading } = useProductGetCategoryAllQuery();
  const [category, setCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const categories = [
    ...new Set(data?.product?.map((product) => product.productDetail.kitchen)),
  ];
  return (
    <div className="min-h-screen mt-[100px]">
      <Hero title={"Menülerimiz"} />
      <img src={appbg} alt="" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center">
        <div className="mb-12">
          <Title title="Menülerimiz" titleSub="Dünya mutfaklarımız" />
        </div>
        <div className="flex gap-2 items-center justify-center mb-12">
          <Button
            color="primary"
            className={category === "All" ? "bg-blue-500 text-white" : ""}
            onClick={() => setCategory("All")}
          >
            Hepsi
          </Button>
          {categories.map((cat, index) => (
            <Button
              key={index}
              color="primary"
              className={category === cat ? "bg-blue-500 text-white" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-3 gap-12">
            {data?.product?.map((product) => {
              if (
                category === "All" ||
                category === product.productDetail.kitchen
              ) {
                return <MenuItem key={product._id} {...product} />;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
