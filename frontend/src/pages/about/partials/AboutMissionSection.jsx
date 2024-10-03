import hamburger from "/about/choose-burger.png";
import logo from "/logo.png";
import tick from "/icons8-tick-48.png";

const aboutSection = [
  {
    id: 1,
    image: tick,
    title: "Üstün Lezzet ve Kalite için Taze, Yerel Malzemeler",
  },
  {
    id: 2,
    image: tick,
    title: "Doğadan Sofralarınıza Gelen Doğal Ürünler",
  },
  {
    id: 3,
    image: tick,
    title: "Geleneksel Tariflerle Modern Sunumlar",
  },
  {
    id: 4,
    image: tick,
    title: "Usta Şeflerimizin Elinden Eşsiz Tatlar",
  },
  {
    id: 5,
    image: tick,
    title: "Sağlıklı ve Lezzetli Yemek Deneyimi",
  },
];

const AboutMissionSection = () => {
  return (
    <div className="flex w-full relative">
      <div className="w-1/2">
        <div>
          <img src={hamburger} alt="" className="rounded-full" />
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-start justify-center">
        <img
          src={logo}
          alt=""
          className="absolute z-[-50] opacity-35 -top-[25%] right-0"
        />
        <h1 className="text-[#005C53] text-[50px] font-extrabold">
          Geleneksel Tatlar, Modern Dokunuşlar
        </h1>
        <p className="text-[#44615e] text-[18px]">
          Sıcak ve davetkar bir atmosferde eşsiz mutfak lezzetlerini
          deneyimleyin. Lezzet Bahçesi&apos;nin unutulmaz yemekler için neden
          mükemmel bir yer olduğunu keşfedin.
        </p>
        <div className="flex flex-col gap-8 mt-12">
          {aboutSection.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img src={item.image} alt="" className="w-8 h-8 " />
              <span className="text-[#44615e] text-[18px]">{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMissionSection;
