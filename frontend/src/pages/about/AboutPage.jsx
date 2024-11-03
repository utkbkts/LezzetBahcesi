import Hero from "../../components/hero/Hero";
import menu4 from "/food/menu4.png";
import offer from "/food/offer_img.png";
import about from "/food/slider-img1.png";
import menu7 from "/menuPage/img-def.png";
import AboutFeatureSection from "./partials/AboutFeatureSection";
import AboutMissionSection from "./partials/AboutMissionSection";
import AboutChefSection from "./partials/AboutChefSection";
import AboutSocialMediaSection from "./partials/AboutSocialMediaSection";
import Loading from "../../components/loading/Loader";
import { useGetAboutQuery } from "../../redux/api/AboutApi";
import MetaData from "../../layouts/MetaData";

const AboutPage = () => {
  const { data, isLoading } = useGetAboutQuery();
  const secondsModal = data?.about;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <MetaData title="Hakkımızda" />

      {/* Hero Section */}
      <div className="relative ">
        <Hero
          classNameHero={"bg-about"}
          title={"Hakkımızda."}
          titleClass={"berkshire-swash-regular"}
          subTitle={"15 yıldır hizmetinizde"}
          titleMainClass={"items-center"}
        />
        <div className="absolute md:top-2/3 top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={menu7} alt="image" />
        </div>
      </div>
      <div className="w-full container mx-auto text-black p-6">
        <AboutFeatureSection />
      </div>
      <div className="container min-h-screen mx-auto mt-16  text-black  p-6">
        <AboutMissionSection />
      </div>

      <div className="container mx-auto py-16 px-4 md:px-0 min-h-screen text-black  p-6">
        <AboutChefSection />
      </div>

      <div className="container mx-auto py-16 px-4 md:px-0 lg:min-h-screen h-full text-black  p-6">
        <AboutSocialMediaSection />
      </div>

      <div className="container mx-auto mt-16 flex flex-col lg:flex-row  text-black  p-6">
        <div className="lg:w-1/2 p-6 ">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 lg:text-start text-center">
            {secondsModal?.mission?.header}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4 lg:text-start text-center">
            {secondsModal?.mission?.paragraph}
          </p>
        </div>

        <div className="lg:w-1/2 p-6 w-full ">
          <div className="flex items-center lg:justify-between justify-center">
            {" "}
            <img className="rounded-lg " src={menu4} alt="Restoran Menü" />
            <img
              className="rounded-lg lg:block hidden"
              src={about}
              alt="Restoran Menü"
            />
          </div>
          <img
            className="rounded-lg lg:block hidden"
            src={offer}
            alt="Restoran Menü"
          />
        </div>
      </div>

      <div className="container mx-auto my-16 p-6 bg-white rounded-lg shadow-md text-center  p-6">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          {secondsModal?.whoChoose?.header}
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          {secondsModal?.whoChoose?.paragraph}
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
