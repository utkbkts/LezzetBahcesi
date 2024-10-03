import React, { useState } from "react";
import Loading from "../loading/Loader";
import MenuItem from "../menuItem/MenuItem";
import Title from "../../ui/Title";
import { useProductGetCategoryAllQuery } from "../../redux/api/ProductApi";

const CatagoriesAndMenu = () => {
  const [category, setCategory] = useState("All");
  console.log("🚀 ~ CatagoriesAndMenu ~ category:", category);
  const { data, isLoading } = useProductGetCategoryAllQuery();

  if (isLoading) return <Loading />;

  // Kategorileri benzersiz hale getirmek için Set kullanıyoruz
  const uniqueCategories = Array.from(
    new Set(data.product.map((item) => item.category.name))
  );

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
            {uniqueCategories.map((categoryName) => (
              <div
                key={categoryName}
                className={`flex flex-col items-center gap-2  border-b-transparent border-b-2 cursor-pointer overflow-hidden ${
                  category === categoryName ? " border-b-2 border-b-black" : ""
                }`}
                onClick={() => setCategory(categoryName)}
              >
                <img
                  src={
                    data.product.find(
                      (item) => item.category.name === categoryName
                    )?.category.image
                  }
                  alt={categoryName}
                  className="w-40 h-40 object-cover transition-all duration-500 hover:scale-110 "
                />
                <h1 className="uppercase text-black open-sans">
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
