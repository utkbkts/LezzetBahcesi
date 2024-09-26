import { useState } from "react";
import Title from "../../ui/Title";
import menu1 from "/hero/menu-1.jpg";
import menu2 from "/hero/menu-2.jpg";
import menu3 from "/hero/menu-3.jpg";
import menu4 from "/hero/menu-4.jpg";
import hamburger from "/hamburger.png";
import fork from "/fork.png";
import coffe from "/coffe.png";
const menuData = [
  {
    id: 1,
    title: "Serpme Kahvaltı",
    price: "120$",
    description:
      "Zengin çeşitleriyle serpme kahvaltı; peynir, zeytin, bal ve kaymakla dolu.",
    imgSrc: menu1,
    category: "kahvaltı",
  },
  {
    id: 2,
    title: "Gözleme Tabağı",
    price: "90$",
    description: "Taze yapılmış peynirli, ıspanaklı ve patatesli gözlemeler.",
    imgSrc: menu2,
    category: "kahvaltı",
  },
  {
    id: 3,
    title: "Menemen",
    price: "70$",
    description: "Domates, biber ve yumurta ile hazırlanan nefis menemen.",
    imgSrc: menu3,
    category: "kahvaltı",
  },
  {
    id: 4,
    title: "Avokadolu Tost",
    price: "65$",
    description: "Ezilmiş avokado, domates ve fesleğenli sağlıklı tost.",
    imgSrc: menu4,
    category: "kahvaltı",
  },
  {
    id: 5,
    title: "Yumurtalı Ekmek",
    price: "55$",
    description: "Tereyağında kızartılmış çıtır yumurtalı ekmek dilimleri.",
    imgSrc: menu4,
    category: "kahvaltı",
  },
  {
    id: 6,
    title: "Pankek Tabağı",
    price: "80$",
    description: "Taze meyveler ve bal ile servis edilen yumuşak pankekler.",
    imgSrc: menu4,
    category: "kahvaltı",
  },
  {
    id: 7,
    title: "Simit ve Çay",
    price: "40$",
    description: "Sıcak simit, beyaz peynir ve taze çay ile klasik kahvaltı.",
    imgSrc: menu4,
    category: "kahvaltı",
  },
  {
    id: 8,
    title: "Köy Kahvaltısı",
    price: "150$",
    description: "Doğal ürünlerle dolu zengin köy kahvaltısı.",
    imgSrc: menu4,
    category: "kahvaltı",
  },
  {
    id: 9,
    title: "Omlet Çeşitleri",
    price: "70$",
    description: "Kaşarlı, mantarlı ve sade omlet seçenekleri.",
    imgSrc: menu4,
    category: "kahvaltı",
  },
  {
    id: 10,
    title: "Börek Tabağı",
    price: "85$",
    description: "Çıtır ıspanaklı ve peynirli börekler.",
    imgSrc: menu4,
    category: "kahvaltı",
  },
  {
    id: 11,
    title: "Izgara Tavuk",
    price: "120$",
    description:
      "Taze baharatlarla marine edilmiş ızgara tavuk, salata ile servis edilir.",
    imgSrc: menu1,
    category: "öğle",
  },
  {
    id: 12,
    title: "Izgara dinner Tavuk",
    price: "120$",
    description:
      "Taze baharatlarla marine edilmiş ızgara tavuk, salata ile servis edilir.",
    imgSrc: menu1,
    category: "dinner",
  },
];

const PopularMenu = () => {
  const [category, setCategory] = useState("kahvaltı");

  const filteredMenu = menuData.filter((item) => item.category === category);
  return (
    <div className="min-h-screen mt-24">
      <Title title="Popüler Yiyecekler" titleSub={"Öğünlerimiz"} />
      <div className="container mx-auto mt-12">
        <div className="flex items-center gap-4 justify-center mb-12">
          <div
            className={`flex items-center cursor-pointer pb-2  border-b-transparent border-b-2 gap-2 ${
              category === "kahvaltı" ? "!border-b-orange-400 border-b-2" : ""
            }`}
            onClick={() => setCategory("kahvaltı")}
          >
            <img src={coffe} alt="" className="w-12" />
            <h6 className="flex flex-col">
              Güne Zinde Başlatan <strong>Kahvaltılar</strong>
            </h6>
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer border-b-transparent pb-2 border-b-2 ${
              category === "öğle" ? "!border-b-orange-400 border-b-2" : ""
            }`}
            onClick={() => setCategory("öğle")}
          >
            <img src={fork} alt="" className="w-12" />
            <h6 className="flex flex-col">
              Enerji Dolu <strong>Öğle Yemekleri</strong>
            </h6>
          </div>
          <div
            className={`flex items-center gap-2 cursor-pointer border-b-transparent pb-2 border-b-2 ${
              category === "dinner" ? "!border-b-orange-400 border-b-2" : ""
            }`}
            onClick={() => setCategory("dinner")}
          >
            <img src={hamburger} alt="" className="w-12" />
            <h6 className="flex flex-col">
              Gün Batımında <strong>Akşam Ziyafetleri</strong>
            </h6>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-12">
          {filteredMenu.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-20 object-cover"
              />
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between border-b border-gray-400 ">
                  <h5 className="font-bold">{item.title}</h5>
                  <span className="text-orange-400 font-bold text-[20px]">
                    {item.price}
                  </span>
                </div>
                <p className="text-[14px] text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularMenu;
