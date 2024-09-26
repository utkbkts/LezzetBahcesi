import React, { useState } from "react";
import { Button } from "antd";
import Loading from "../loading/Loader";
import MenuItem from "../menuItem/MenuItem";
import Title from "../../ui/Title";
import { useProductGetCategoryAllQuery } from "../../redux/api/ProductApi";

const CatagoriesAndMenu = () => {
  const [category, setCategory] = useState("All");
  const { data, isLoading } = useProductGetCategoryAllQuery();
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(8);
  const categories = [
    ...new Set(data?.product?.map((product) => product.productDetail.kitchen)),
  ];
  const showMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prevState) => prevState + 4);
      setLoading(false);
    }, 500);
  };

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
            {data?.product?.slice(0, visible).map((product) => {
              if (
                category === "All" ||
                category === product.productDetail.kitchen
              ) {
                return <MenuItem key={product._id} {...product} />;
              }
            })}
          </div>
          {data?.product?.length > visible && (
            <div className="pt-4 pb-4">
              <Button type="primary" onClick={showMoreItems}>
                {loading ? "yükleniyor." : "Daha Fazla"}
              </Button>
            </div>
          )}
        </div>
      </section>
    </React.Fragment>
  );
};

export default CatagoriesAndMenu;
