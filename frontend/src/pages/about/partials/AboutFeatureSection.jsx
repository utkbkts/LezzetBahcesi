import { HandPlatter, ShoppingCart, User, Utensils } from "lucide-react";
import React from "react";
import { useGetAboutQuery } from "../../../redux/api/AboutApi";
import Loading from "../../../components/loading/Loader";
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

const AboutFeatureSection = () => {
  const { data: getAbout, isLoading } = useGetAboutQuery();
  const staticModal = getAbout?.about?.staticModal;
  const staticDesc = staticModal?.descriptionStatic?.split(".");
  const staticImages = staticModal?.staticImages;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <div className="mt-12 grid custom:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
        {sectionField.map((item) => (
          <div
            key={item.id}
            className="custom:w-[350px] w-full h-[250px] py-4 px-4 bg-white shadow-lg rounded-md flex flex-col gap-2 hover:bg-[#FEA116] transition-all duration-300 group"
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
      <div className="flex lg:flex-row flex-col items-start mt-20">
        <div className="lg:flex-1 w-full">
          <div className="md:flex hidden items-center gap-4">
            <img src={staticImages[0]?.url} alt="" className="w-64" />
            <img src={staticImages[1]?.url} alt="" className="w-52 mt-24" />
          </div>
          <div className="md:flex hidden items-center gap-4 mt-4 ml-12">
            <img src={staticImages[2]?.url} alt="" className="w-52 mb-[5rem]" />
            <img src={staticImages[3]?.url} alt="" className="w-64" />
          </div>
        </div>
        <div className="lg:flex-1 w-full">
          <div className="flex flex-col ">
            <span className="relative text-xl leading-4 text-[#FEA116] md:block hidden">
              Hakkımızda
              <span className="absolute top-1/2 inset-y-0 left-32 bg-orange-500 h-[1px] w-32"></span>
            </span>
            <div className="flex mt-4 flex-col items-center justify-center md:text-start text-center">
              {staticDesc?.map((sentence, index) => (
                <p key={index} className="pt-4 ">
                  {sentence?.trim()}
                </p>
              ))}

              <div className=" items-center justify-between md:flex hidden">
                <span className="relative flex items-center gap-4 ml-4 pt-8">
                  <span className="absolute h-full w-1 -left-3 bg-orange-400"></span>
                  <strong className="text-[#FEA116] text-[48px]">
                    {staticModal?.experience?.years}
                  </strong>
                  <span className="flex flex-col">
                    Yıllık <strong className="text-[16px]">Deneyim</strong>
                  </span>
                </span>

                <span className="relative flex items-center gap-4 ml-4 pt-8">
                  <span className="absolute h-full w-1 -left-3 bg-orange-400"></span>
                  <strong className="text-[#FEA116] text-[48px]">
                    {staticModal?.customers?.count}
                  </strong>
                  <span className="flex flex-col">
                    Memnun<strong className="text-[16px]"> Müşteri</strong>
                  </span>
                </span>

                <span className="relative flex items-center gap-4 ml-4 pt-8">
                  <span className="absolute h-full w-1 -left-3 bg-orange-400"></span>
                  <strong className="text-[#FEA116] text-[48px]">
                    {staticModal?.dishes?.count}
                  </strong>
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
    </React.Fragment>
  );
};

export default AboutFeatureSection;
