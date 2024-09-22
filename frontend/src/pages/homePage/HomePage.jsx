import React, { useEffect } from "react";
import Categories from "../../components/categories/Categories";
import AboutSection from "../../components/aboutSection/AboutSection";
import PopularMenu from "../../components/popularMenu/PopularMenu";
import Reservation from "../../components/reservation/Reservation";
import Hero from "../../components/hero/Hero";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <React.Fragment>
      <Hero
        title={"Lezzetli Yemeklerin Tadını Çıkarın"}
        titleSub={
          " Gurme şeflerimizin özenle hazırladığı yemeklerle damak zevkinizi şımartın. Taze malzemelerle hazırlanan özgün tariflerimizle her lokmada unutulmaz bir deneyim yaşayın."
        }
      />
      <AboutSection />
      <PopularMenu />
      <Reservation />
      <Categories />
    </React.Fragment>
  );
};

export default HomePage;
