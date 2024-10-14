import React, { useState } from "react";
import Loading from "../loading/Loader";
import MenuItem from "../menuItem/MenuItem";
import Title from "../../ui/Title";
import { useProductGetCategoryAllQuery } from "../../redux/api/ProductApi";
import pngwing from "/pngwing.com.png";
const CatagoriesAndMenu = () => {
  const [category, setCategory] = useState("All");
  const { data, isLoading } = useProductGetCategoryAllQuery();

  const uniqueCategories = Array.from(
    new Set(data?.product?.map((item) => item.category.name))
  );

  if (isLoading) return <Loading />;
  return (
    <React.Fragment>
      <section>
        <div className="mb-12">
          <Title
            title="Dünya Mutfaklarımız"
            titleSub="Farklı kültürlerin mutfaklarını keşfedin"
          />
        </div>
        <div className="flex flex-col items-center justify-center container mx-auto">
          <div className="flex gap-2 items-center justify-center mb-12 flex-wrap">
            {/* Benzersiz kategorileri gösteriyoruz */}
            <div
              className={`flex flex-col items-center gap-2 border-b-2 cursor-pointer overflow-hidden transition-all duration-300 transform ${
                category === "All"
                  ? "border-b-black bg-white shadow-lg scale-105"
                  : "border-b-transparent hover:border-b-gray-300 hover:bg-gray-50"
              } rounded-lg p-4`}
              onClick={() => setCategory("All")}
            >
              <img
                src={pngwing}
                alt="Hepsi"
                className="w-40 h-40 object-cover transition-transform duration-500 rounded-lg shadow-md hover:shadow-xl"
              />
              <h1 className="uppercase text-black font-semibold text-lg text-center tracking-wider">
                Hepsi
              </h1>
            </div>
            {uniqueCategories.map((categoryName) => (
              <div
                key={categoryName}
                className={`flex flex-col items-center gap-2 border-b-2 cursor-pointer overflow-hidden transition-all duration-300 transform ${
                  category === categoryName
                    ? "border-b-black bg-white shadow-lg scale-105"
                    : "border-b-transparent hover:border-b-gray-300 hover:bg-gray-50"
                } rounded-lg p-4`}
                onClick={() => setCategory(categoryName)}
              >
                <img
                  src={
                    data.product.find(
                      (item) => item.category.name === categoryName
                    )?.category.image
                  }
                  alt={categoryName}
                  className="w-40 h-40 object-cover transition-transform duration-500 rounded-lg shadow-md hover:shadow-xl"
                />
                <h1 className="uppercase text-black font-semibold text-lg text-center tracking-wider">
                  {categoryName}
                </h1>
              </div>
            ))}
          </div>
          <div
            className={
              "grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4"
            }
          >
            {data?.product?.map((product) => {
              if (category === "All" || category === product.category.name) {
                return <MenuItem key={product._id} {...product} />;
              }
              return null;
            })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CatagoriesAndMenu;
