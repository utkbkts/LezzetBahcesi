import AboutSection from "../../components/aboutSection/AboutSection";
import Hero from "../../components/hero/Hero";
import menu4 from "/food/menu4.png";
import offer from "/food/offer_img.png";
import about from "/food/slider-img1.png";
import menu7 from "/menuPage/img-def.png";
import hamburger from "/about/choose-burger.png";
import logo from "/logo.png";
import tick from "/icons8-tick-48.png";
import chef from "/about/chef.jpg";
import chef2 from "/about/chef2.jpg";
import picture1 from "/about/picture-1.png";
import picture3 from "/about/picture-3.png";
import picture4 from "/about/picture-4.png";
import picture5 from "/about/picture-5.png";
import burgerpattern from "/about/burgerpattern.png";
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

const AboutPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <Hero
          classNameHero={"bg-about"}
          title={"Hakkımızda."}
          titleClass={"berkshire-swash-regular"}
          subTitle={"15 yıldır hizmetinizde"}
          titleMainClass={"items-center"}
        />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={menu7} alt="image" />
        </div>
      </div>
      {/* About Section */}
      <AboutSection />
      {/* about section 2 */}
      <div className="container min-h-screen mx-auto mt-16 flex flex-col md:flex-row items-start">
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
              deneyimleyin. Lezzet Bahçesi&apos;nin unutulmaz yemekler için
              neden mükemmel bir yer olduğunu keşfedin.
            </p>
            <div className="flex flex-col gap-8 mt-12">
              {aboutSection.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt="" className="w-8 h-8 " />
                  <span className="text-[#44615e] text-[18px]">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* about section 3 */}
      <div className="container mx-auto py-16 px-4 md:px-0 min-h-screen">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#005C53]">
            Şeflerimizin Sanatı
          </h2>
          <p className="text-lg text-[#44615e] mt-4">
            En kaliteli malzemelerle, ustalıkla hazırlanan lezzetler.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* İlk Şef Görseli ve İçerik */}
          <div className="relative w-full md:w-1/2 group">
            <img
              src={chef}
              alt="Chef preparing a meal"
              className="w-full h-[500px] object-cover rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 rounded-lg group-hover:scale-105 transform transition-transform duration-500"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-semibold">Baş Aşçı Mehmet</h3>
              <p className="text-md mt-2">
                Geleneksel lezzetleri modern dokunuşlarla buluşturan usta
                şefimiz.
              </p>
            </div>
          </div>

          {/* İkinci Şef Görseli ve İçerik */}
          <div className="relative w-full md:w-1/2 group mt-8 md:mt-0">
            <img
              src={chef2}
              alt="Chef preparing another meal"
              className="w-full h-[500px] object-cover rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 rounded-lg group-hover:scale-105 transform transition-transform duration-500"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-3xl font-semibold">Yardımcı Şef Ayşe</h3>
              <p className="text-md mt-2">
                Her tabağa sanat eseri gibi yaklaşan yetenekli yardımcımız.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About section 4 */}

      <div className="container mx-auto py-16 px-4 md:px-0 min-h-screen">
        <img src={burgerpattern} alt="" className="absolute" />
        <div className="flex flex-col gap-12">
          <div className="w-full flex flex-col items-center justify-center">
            <h1 className="font-extrabold text-4xl text-center text-[#005C53]">
              Bizi sosyal medya hesaplarımızdan takip edebilirsiniz
            </h1>
            <p className="text-lg font-normal text-gray-500 w-[600px] pt-8 text-center">
              Lezzet dolu anlar, en yeni güncellemeler ve özel fırsatlar için
              Instagram sayfamızı takip edin! Lezzet Bahçesi ailesinin bir
              parçası olun ve keyifli yemek yolculuğumuza ortak olun!
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            <img src={picture1} alt="picture1" className="m-[-19px] pt-32" />
            <img src={picture3} alt="picture3" />
            <img src={picture4} alt="picture4" className="m-[-19px] pt-24" />
            <img src={picture5} alt="picture5" />
          </div>
        </div>
        <img src={burgerpattern} alt="" className="absolute right-0" />
      </div>

      {/* Content Section */}
      <div className="container mx-auto mt-16 flex flex-col md:flex-row items-start">
        {/* Text Section */}
        <div className="md:w-1/2 p-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Restoranımızın Misyonu
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Müşterilerimize sadece yemek değil, aynı zamanda unutulmaz bir
            deneyim sunuyoruz. Güler yüzlü hizmet ve şık ambiyans ile her detay
            sizin konforunuz için tasarlandı.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Vizyonumuz, gastronomi dünyasına yenilik katmak ve sürdürülebilir
            mutfak anlayışımızla topluma katkıda bulunmaktır. Sizlere her zaman
            en taze, en kaliteli yemekleri sunmaya devam edeceğiz.
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 p-6">
          <div className="flex items-center justify-between">
            {" "}
            <img className="rounded-lg " src={menu4} alt="Restoran Menü" />
            <img className="rounded-lg " src={about} alt="Restoran Menü" />
          </div>
          <img className="rounded-lg " src={offer} alt="Restoran Menü" />
        </div>
      </div>

      {/* Additional Section */}
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
