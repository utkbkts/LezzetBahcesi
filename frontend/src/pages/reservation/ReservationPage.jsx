import { Fragment } from "react";
import Reservation from "../../components/reservation/Reservation";
import menu7 from "/menuPage/img-def.png";
import Hero from "../../components/hero/Hero";

const ReservationPage = () => {
  return (
    <Fragment>
      <div className="relative">
        <Hero
          classNameHero={"bg-contact"}
          title={"Randevu."}
          titleClass={"berkshire-swash-regular"}
          subTitle={"Şimdi'den yerinizi ayırtın."}
          titleMainClass={"items-center"}
        />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={menu7} alt="image" />
        </div>
      </div>
      <div className="mt-24  p-6">
        <Reservation />
      </div>
    </Fragment>
  );
};

export default ReservationPage;
