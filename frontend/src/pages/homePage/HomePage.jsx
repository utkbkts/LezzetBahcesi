import React, { useEffect } from "react";
import Categories from "../../components/categories/Categories";
import PopularMenu from "../../components/popularMenu/PopularMenu";
import Reservation from "../../components/reservation/Reservation";
import Hero from "../../components/hero/Hero";
import AboutFeatureSection from "../about/partials/AboutFeatureSection";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <Hero
        title={"Lezzetli Yemeklerin Tadını Çıkarın"}
        subTitle={
          " Gurme şeflerimizin özenle hazırladığı yemeklerle damak zevkinizi şımartın. Taze malzemelerle hazırlanan özgün tariflerimizle her lokmada unutulmaz bir deneyim yaşayın."
        }
        subTitleClass={"mds:text-start text-center"}
        titleClass={
          "mds:text-[44px] text-[40px] mds:pt-0 pt-12 mds:text-start text-center"
        }
        titleMainClass={
          "w-full flex flex-col mds:items-start items-center justify-center"
        }
      />
      <div className="container mx-auto text-black p-6">
        <AboutFeatureSection />
        <PopularMenu />
        <Reservation />
        <Categories />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
