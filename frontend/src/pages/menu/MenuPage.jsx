import Hero from "../../components/hero/Hero";
import menu from "/menuPage/left-menu.png";
import menu1 from "/menuPage/menu-before-2.jpg";
import menu2 from "/menuPage/menu-before.jpg";
import menu5 from "/menuPage/pasta-menu.jpg";
import menu6 from "/menuPage/pizza-menu.jpg";
import menu7 from "/menuPage/img-def.png";
import menu8 from "/menuPage/divider-free-img.png";
import menu9 from "/menuPage/hamburger.jpg";
import menu10 from "/menuPage/menu-footer.png";
import { useEffect, useRef, useState } from "react";
const pasta = [
  {
    id: 1,
    title: "Tam Tahıllı Makarna",
    description:
      "Közlenmiş patlıcan püresi, sarımsaklı marine domatesler ve taze fesleğen",
    price: 120.0,
  },
  {
    id: 2,
    title: "Tortellini Gorgonzola",
    description:
      "Közlenmiş patlıcan püresi, sarımsaklı marine domatesler ve taze fesleğen",
    price: 80.5,
  },
  {
    id: 3,
    title: "Rigatoni Zuccati",
    description:
      "Közlenmiş patlıcan püresi, sarımsaklı marine domatesler ve taze fesleğen",
    price: 100.5,
  },
  {
    id: 4,
    title: "Spaghetti Marinara",
    description:
      "Közlenmiş patlıcan püresi, sarımsaklı marine domatesler ve taze fesleğen",
    price: 130.5,
  },
];
const pizza = [
  {
    id: 1,
    title: "Margherita Pizza",
    description: "Domates sosu, mozzarella peyniri ve taze fesleğen",
    price: 120.0,
  },
  {
    id: 2,
    title: "Pepperoni Pizza",
    description: "Domates sosu, mozzarella peyniri ve pepperoni dilimleri",
    price: 80.5,
  },
  {
    id: 3,
    title: "Vegetarian Pizza",
    description:
      "Domates sosu, mozzarella peyniri, biber, mantar, zeytin ve soğan",
    price: 100.5,
  },
  {
    id: 4,
    title: "BBQ Chicken Pizza",
    description:
      "BBQ sosu, mozzarella peyniri, tavuk parçaları ve kırmızı soğan",
    price: 130.5,
  },
];
const hamburger = [
  {
    id: 1,
    title: "Cheeseburger",
    description:
      "Dana köftesi, cheddar peyniri, marul, domates, turşu ve özel sos",
    price: 75.0,
  },
  {
    id: 2,
    title: "Bacon Burger",
    description:
      "Dana köftesi, çıtır bacon, marul, domates, karamelize soğan ve barbekü sos",
    price: 85.5,
  },
  {
    id: 3,
    title: "Mushroom Swiss Burger",
    description:
      "Dana köftesi, İsviçre peyniri, sotelenmiş mantar, marul ve mayonez",
    price: 90.0,
  },
  {
    id: 4,
    title: "Veggie Burger",
    description:
      "Sebze köftesi, marul, domates, avokado dilimleri ve vegan mayonez",
    price: 70.0,
  },
];
const MenuPage = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let interval = useRef();

  useEffect(() => {
    const countDownDate = Date.now() + 7 * 24 * 60 * 60 * 1000;

    interval.current = setInterval(() => {
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
    }, 1000);

    return () => {
      clearInterval(interval.current);
    };
  }, []);

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
        <img src={menu} alt="" className="absolute left-0 z-[-1] top-[100%]" />
      </div>
      <div className="min-h-screen mt-[100px] relative text-black">
        <img src={menu2} alt="" className="absolute right-0 z-[-10]" />
        <div className="max-w-5xl mx-auto ">
          <div className="flex gap-12 min-h-screen">
            <div className="w-1/2 h-full">
              <div className="bg-pasta w-full h-full">
                <div className="img-wrapper">
                  <img
                    src={menu5}
                    alt="image"
                    className="w-full h-full rounded-md shadow-xl hover:scale-105 duration-300 transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex flex-col items-center justify-center">
                <h1 className="berkshire-swash-regular ">Makarna</h1>
                <img src={menu8} alt="" />
              </div>
              <div>
                {pasta.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 mt-12"
                  >
                    <div className="flex flex-col gap-2">
                      <span>{item.title}</span>
                      <p className="text-gray-500 pb-2 ">{item.description}</p>
                    </div>
                    <div>
                      <span>{item.price.toFixed(2)}₺</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[10%] min-h-screen relative text-black">
        <img src={menu2} alt="" className="absolute right-0 z-[-50]" />
        <div className="max-w-5xl mx-auto ">
          <div className="flex gap-12 min-h-screen">
            <div className="w-1/2">
              <div className="flex flex-col items-center justify-center">
                <h1 className="berkshire-swash-regular ">Pizza</h1>
                <img src={menu8} alt="" />
              </div>
              <div>
                {pizza.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 mt-12"
                  >
                    <div className="flex flex-col gap-2">
                      <span>{item.title}</span>
                      <p className="text-gray-500 pb-2 ">{item.description}</p>
                    </div>
                    <div>
                      <span>{item.price.toFixed(2)}₺</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2 h-full">
              <div className="bg-pasta w-full h-full">
                <div className="img-wrapper">
                  <img
                    src={menu6}
                    alt="image"
                    className="w-full h-full rounded-md shadow-xl hover:scale-105 duration-300 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mt-[10%] min-h-screen relative text-black">
        <img
          src={menu1}
          alt=""
          className="absolute right-0 opacity-20 z-[-50] "
        />
        <div className="max-w-5xl mx-auto ">
          <div className="flex gap-12 min-h-screen">
            <div className="w-1/2 h-full">
              <div className="bg-pasta w-full h-full">
                <div className="img-wrapper">
                  <img
                    src={menu9}
                    alt="image"
                    className="w-full h-full rounded-md shadow-xl hover:scale-105 duration-300 transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex flex-col items-center justify-center">
                <h1 className="berkshire-swash-regular ">Hamburger</h1>
                <img src={menu8} alt="" />
              </div>
              <div>
                {hamburger.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 mt-12"
                  >
                    <div className="flex flex-col gap-2">
                      <span>{item.title}</span>
                      <p className="text-gray-500 pb-2 ">{item.description}</p>
                    </div>
                    <div>
                      <span>{item.price.toFixed(2)}₺</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[10%] min-h-screen relative text-black">
        <div className="bg-friends">
          <div className="flex flex-col items-center justify-center absolute z-[50] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-5">
            <h4 className="text-[#eba83c] text-[35px] font-bold mb-2 berkshire-swash-regular">
              Büyük indirimler sizi bekliyor! %50 fırsatını kaçırmayın!
            </h4>
            <h2 className="text-white text-4xl font-bold">{`${timerDays}:${timerHours}:${timerMinutes}:${timerSeconds}`}</h2>
            <button className="py-4 px-9 rounded-full text-white bg-orange-500">
              Şimdi Randevu al
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[10%] min-h-screen relative">
        <div className="flex items-center justify-center">
          <img src={menu10} alt="" />
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
