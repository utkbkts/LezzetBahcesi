import React, { useState } from "react";
import { Button } from "antd";
import Loading from "../loading/Loader";
import MenuItem from "../menuItem/MenuItem";
import Title from "../../ui/Title";
import { useProductGetCategoryAllQuery } from "../../redux/api/ProductApi";

const CatagoriesAndMenu = () => {
  const [category, setCategory] = useState("All");
  const { data, isLoading } = useProductGetCategoryAllQuery();
  const categories = [
    ...new Set(data?.product?.map((product) => product.productDetail.kitchen)),
  ];
  console.log(data);

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
          <div className={"grid grid-cols-4 gap-4"}>
            {data?.product?.map((product) => {
              if (
                category === "All" ||
                category === product.productDetail.kitchen
              ) {
                return <MenuItem key={product._id} {...product} />;
              }
            })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CatagoriesAndMenu;
