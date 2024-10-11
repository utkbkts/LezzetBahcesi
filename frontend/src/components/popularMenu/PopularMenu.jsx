import { useState } from "react";
import Title from "../../ui/Title";

import hamburger from "/hamburger.png";
import fork from "/fork.png";
import coffe from "/coffe.png";
import { useProductGetCategoryAllQuery } from "../../redux/api/ProductApi";
import Loading from "../loading/Loader";

const PopularMenu = () => {
  const [category, setCategory] = useState("kahvaltı");
  const { data, isLoading } = useProductGetCategoryAllQuery();
  if (isLoading) return <Loading />;

  const filteredMenu =
    data?.product.filter((item) => item.category.name === category) || [];
  return (
    <div className="min-h-screen mt-24">
      <Title title="Popüler Yiyecekler" titleSub={"Öğünlerimiz"} />
      <div className="container mx-auto mt-12">
        <div className="flex items-center lg:flex-row flex-col  gap-4 justify-center mb-12">
          <div
            className={`flex items-center cursor-pointer pb-2  border-b-transparent border-b-2 gap-2 ${
              category === "kahvaltı" ? "!border-b-orange-400 border-b-2" : ""
            }`}
            onClick={() => setCategory("kahvaltı")}
          >
            <img src={coffe} alt="" className="w-12" />
            <h6 className="flex flex-col">
              Güne Zinde Başlatan <strong>Kahvaltılar</strong>
            </h6>
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer border-b-transparent pb-2 border-b-2 ${
              category === "öğle yemeği"
                ? "!border-b-orange-400 border-b-2"
                : ""
            }`}
            onClick={() => setCategory("öğle yemeği")}
          >
            <img src={fork} alt="" className="w-12" />
            <h6 className="flex flex-col">
              Enerji Dolu <strong>Öğle Yemekleri</strong>
            </h6>
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer border-b-transparent pb-2 border-b-2 ${
              category === "akşam yemeği"
                ? "!border-b-orange-400 border-b-2"
                : ""
            }`}
            onClick={() => setCategory("akşam yemeği")}
          >
            <img src={hamburger} alt="" className="w-12" />
            <h6 className="flex flex-col">
              Gün Batımında <strong>Akşam Ziyafetleri</strong>
            </h6>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
          {filteredMenu.map((item) => (
            <div key={item.id} className="flex items-center gap-2 ">
              <img
                src={item.images[0]?.url}
                alt={item.productDetail.title}
                className="w-24 object-cover h-12"
              />
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between border-b border-gray-400 ">
                  <h5 className="font-bold">{item.productDetail.title}</h5>
                  <span className="text-orange-400 font-bold text-[20px]">
                    {item.productDetail.price.toFixed(2)}₺
                  </span>
                </div>
                <p className="text-[14px] text-gray-600">
                  {item.productDetail.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularMenu;
