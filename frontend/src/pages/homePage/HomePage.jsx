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
        subTitleClass={
          "lg:text-start text-center md:text-[16px] text-[14px] lg:w-[700px]"
        }
        titleClass={
          "lg:text-[44px] sm:text-[40px] text-[18px] mds:pt-0 pt-12 mds:text-start text-center"
        }
        titleMainClass={
          "w-full flex flex-col lg:items-start items-center justify-center"
        }
      />
      <div className="container mx-auto text-black p-6 ">
        <AboutFeatureSection />
        <PopularMenu />
        <Reservation />
        <Categories />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
