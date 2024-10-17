import Hero from "../../components/hero/Hero";
import menu from "/menuPage/left-menu.png";
import menu1 from "/menuPage/menu-before-2.jpg";
import menu2 from "/menuPage/menu-before.jpg";
import menu7 from "/menuPage/img-def.png";

import menu10 from "/menuPage/menu-footer.png";
import { useCallback, useEffect, useRef, useState } from "react";
import SectionOne from "./partials/SectionOne";
import SectionTwo from "./partials/SectionTwo";
import SectionThree from "./partials/SectionThree";

const MenuPage = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();
  const countDownDate = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const updateTimer = useCallback(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(interval.current);
      setTimerDays("00");
      setTimerHours("00");
      setTimerMinutes("00");
      setTimerSeconds("00");
    } else {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimerDays(days.toString().padStart(2, "0"));
      setTimerHours(hours.toString().padStart(2, "0"));
      setTimerMinutes(minutes.toString().padStart(2, "0"));
      setTimerSeconds(seconds.toString().padStart(2, "0"));
    }
  }, [countDownDate]);

  useEffect(() => {
    interval.current = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, [updateTimer]);

  return (
    <div>
      <div className="relative ">
        <Hero
          title={"Menüler."}
          subTitle={"Siz ne isterseniz."}
          classNameHero={`bg-menu`}
          titleClass={"berkshire-swash-regular"}
          titleMainClass={"flex items-center justify-center"}
        />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <img src={menu7} alt="image" />
        </div>
        <img
          src={menu}
          alt=""
          className="absolute left-0 z-[-1] top-[100%] mds:block hidden"
        />
      </div>
      <SectionOne />
      <div className=" mt-[10%] min-h-screen relative text-black">
        <img src={menu2} alt="" className="absolute right-0 z-[-50] " />
        <SectionTwo />
      </div>
      <div className=" mt-[10%] min-h-screen relative text-black">
        <img
          src={menu1}
          alt=""
          className="absolute right-0 opacity-20 z-[-50] "
        />
        <div className="max-w-5xl mx-auto ">
          <SectionThree />
        </div>
      </div>
      <div className="mt-[10%] min-h-screen relative text-black mds:block hidden">
        <div className="bg-friends">
          <div className="flex flex-col items-center justify-center absolute z-[50] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5">
            <h4 className="text-[#eba83c] mds:text-[35px] text-[20px] mds:text-start text-center font-bold mb-2 berkshire-swash-regular">
              Büyük indirimler sizi bekliyor! %50 fırsatını kaçırmayın!
            </h4>
            <h2 className="text-white text-4xl font-bold">{`${timerDays}:${timerHours}:${timerMinutes}:${timerSeconds}`}</h2>
            <button className="mds:py-4 mds:px-9 py-1 px-2 rounded-full text-white bg-orange-500">
              Şimdi Randevu al
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[10%] mds:min-h-screen h-full pb-4 relative">
        <div className="flex items-center justify-center">
          <img src={menu10} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
