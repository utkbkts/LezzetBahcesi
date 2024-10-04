import Hero from "../../components/hero/Hero";
import menu4 from "/food/menu4.png";
import offer from "/food/offer_img.png";
import about from "/food/slider-img1.png";
import menu7 from "/menuPage/img-def.png";
import AboutFeatureSection from "./partials/AboutFeatureSection";
import AboutMissionSection from "./partials/AboutMissionSection";
import AboutChefSection from "./partials/AboutChefSection";
import AboutSocialMediaSection from "./partials/AboutSocialMediaSection";

const AboutPage = () => {
  return (
    <div>
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
      <div className="w-full container mx-auto text-black">
        <AboutFeatureSection />
      </div>
      <div className="container min-h-screen mx-auto mt-16  text-black">
        <AboutMissionSection />
      </div>

      <div className="container mx-auto py-16 px-4 md:px-0 min-h-screen text-black">
        <AboutChefSection />
      </div>

      <div className="container mx-auto py-16 px-4 md:px-0 lg:min-h-screen h-full text-black">
        <AboutSocialMediaSection />
      </div>

      <div className="container mx-auto mt-16 flex flex-col lg:flex-row  text-black">
        <div className="lg:w-1/2 p-6 ">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 lg:text-start text-center">
            Restoranımızın Misyonu
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4 lg:text-start text-center">
            Müşterilerimize sadece yemek değil, aynı zamanda unutulmaz bir
            deneyim sunuyoruz. Güler yüzlü hizmet ve şık ambiyans ile her detay
            sizin konforunuz için tasarlandı.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-4 lg:text-start text-center">
            Vizyonumuz, gastronomi dünyasına yenilik katmak ve sürdürülebilir
            mutfak anlayışımızla topluma katkıda bulunmaktır. Sizlere her zaman
            en taze, en kaliteli yemekleri sunmaya devam edeceğiz.
          </p>
        </div>

        <div className="lg:w-1/2 p-6 w-full">
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

      <div className="container mx-auto my-16 p-6 bg-white rounded-lg shadow-md text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Neden Bizi Seçmelisiniz?
        </h3>
        <p className="text-lg text-gray-600 leading-relaxed">
          Biz, yalnızca yemek değil; dostlarınızla ve ailenizle
          paylaşabileceğiniz unutulmaz anılar sunuyoruz. Özel tariflerimiz ve
          her damak zevkine hitap eden menümüz ile sizleri ağırlamaktan mutluluk
          duyuyoruz.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
