import React, { useEffect } from "react";
import Categories from "../../components/categories/Categories";
import PopularMenu from "../../components/popularMenu/PopularMenu";
import Reservation from "../../components/reservation/Reservation";
import Hero from "../../components/hero/Hero";
import AboutFeatureSection from "../about/partials/AboutFeatureSection";
import UserCount from "../../components/userCount/UserCount";

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
        subTitleClass={"custom:text-start text-center"}
        titleClass={
          "custom:text-[64px] text-[40px] custom:pt-0 pt-12 custom:text-start text-center"
        }
        titleMainClass={
          "w-full flex flex-col custom:items-start items-center justify-center"
        }
      />
      <div className="container mx-auto text-black">
        <AboutFeatureSection />
        <UserCount />
        <PopularMenu />
        <Reservation />
        <Categories />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
