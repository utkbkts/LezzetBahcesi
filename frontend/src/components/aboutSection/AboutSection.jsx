import React from "react";
import { HandPlatter, ShoppingCart, User, Utensils } from "lucide-react";
import img from "/hero/about-1.jpg";
import img2 from "/hero/about-2.jpg";
import img3 from "/hero/about-3.jpg";
import img4 from "/hero/about-4.jpg";
const sectionField = [
  {
    id: 1,
    label: "Şeflerimiz",
    paragraphy:
      "Gurme şeflerimiz, her yemeği sanata dönüştürüyor. Her tabakta tutku ve ustalık var.",
    icon: <User size={70} />,
  },
  {
    id: 2,
    label: "Kaliteli Gıda",
    paragraphy:
      "Taze ve kaliteli malzemelerle hazırlanan yemeklerimiz, damak zevkinizi şımartacak.",
    icon: <Utensils size={70} />,
  },
  {
    id: 3,
    label: "Online Sipariş hizmeti",
    paragraphy:
      "Hızlı ve güvenilir online sipariş sistemimiz ile istediğiniz lezzetlere anında ulaşın.",
    icon: <ShoppingCart size={70} />,
  },
  {
    id: 4,
    label: "7/24 Destek",
    paragraphy:
      "Günün her saati hizmetinizdeyiz. İhtiyacınız olduğunda yanınızdayız!",
    icon: <HandPlatter size={70} />,
  },
];

const AboutSection = () => {
  return (
    <div className="w-full container mx-auto">
      <div className="mt-12 flex gap-4">
        {sectionField.map((item) => (
          <div
            key={item.id}
            className="w-[400px] h-[250px] py-4 px-4 bg-white shadow-lg rounded-md flex flex-col gap-2 hover:bg-[#FEA116] transition-all duration-300 group"
          >
            <div className="text-[#FEA116] group-hover:text-white">
              {item.icon}
            </div>
            <h5 className="text-lg font-semibold">{item.label}</h5>
            <hr />
            <p className="text-[16px] leading-[24px] text-[#ccd1d6] font-[400] open-sans">
              {item.paragraphy}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-start mt-20">
        <div className="flex-1 ">
          <div className="flex items-center gap-4">
            <img src={img} alt="" className="w-64" />
            <img src={img2} alt="" className="w-52 mt-24" />
          </div>
          <div className="flex items-center gap-4 mt-4 ml-12">
            <img src={img3} alt="" className="w-52 mb-[5rem]" />
            <img src={img4} alt="" className="w-64" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col">
            <span className="relative text-xl leading-4 text-[#FEA116]">
              Hakkımızda
              <span className="absolute top-1/2 inset-y-0 left-32 bg-orange-500 h-[1px] w-32"></span>
            </span>
            <div className="flex mt-4 flex-col">
              <h2 className="flex items-center gap-2 text-[32px] font-[800]">
                Lezzet <Utensils size={60} className="text-[#FEA116]" />
                Bahçesi
              </h2>
              <p className="pt-4">
                Restoranımız, 2009 yılında kaliteli ve lezzetli yemekler sunma
                amacıyla kuruldu. Mutfak ekibimiz, taze ve yerel malzemeleri
                kullanarak sizlere eşsiz bir lezzet deneyimi yaşatmayı
                hedefliyor.
                <p className="pt-4">
                  Mutfak anlayışımız, sadece yemek sunmaktan ibaret değil.
                  Misafirlerimize sıcak, samimi bir ortamda en kaliteli hizmeti
                  sunmayı ilke edindik. Her bir tabakta sadece lezzet değil,
                  aynı zamanda tutkuyu da hissedeceksiniz.
                </p>
                <p className="pt-4">
                  Misyonumuz, çevreye duyarlı, sürdürülebilir malzemeler
                  kullanarak topluma katkı sağlamak ve sağlıklı yemeklerle
                  misafirlerimizin gönlünde yer edinmektir.
                </p>
                <p className="pt-4">
                  Her gün, siz değerli misafirlerimizi ağırlamak, bize mutluluk
                  veriyor. Özel günlerinizde yanınızda olmayı ve her anınızı
                  daha da özel kılmayı arzuluyoruz.
                </p>
              </p>

              <div className="flex items-center justify-between">
                <span className="relative flex items-center gap-4 ml-4 pt-8">
                  <span className="absolute h-full w-1 -left-3 bg-orange-400"></span>
                  <strong className="text-[#FEA116] text-[48px]">15</strong>
                  <span className="flex flex-col">
                    Yıllık <strong className="text-[16px]">Deneyim</strong>
                  </span>
                </span>

                <span className="relative flex items-center gap-4 ml-4 pt-8">
                  <span className="absolute h-full w-1 -left-3 bg-orange-400"></span>
                  <strong className="text-[#FEA116] text-[48px]">500+</strong>
                  <span className="flex flex-col">
                    Memnun<strong className="text-[16px]"> Müşteri</strong>
                  </span>
                </span>

                <span className="relative flex items-center gap-4 ml-4 pt-8">
                  <span className="absolute h-full w-1 -left-3 bg-orange-400"></span>
                  <strong className="text-[#FEA116] text-[48px]">100+</strong>
                  <span className="flex flex-col">
                    Lezzetli{" "}
                    <strong className="text-[16px]">Yemek Çeşidi</strong>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
