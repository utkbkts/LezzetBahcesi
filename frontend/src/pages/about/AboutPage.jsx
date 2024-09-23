import React from "react";
import AboutSection from "../../components/aboutSection/AboutSection";
import Hero from "../../components/hero/Hero";
import menu4 from "/food/menu4.png";
import offer from "/food/offer_img.png";
import about from "/food/slider-img1.png";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Hero Section */}
      <Hero title={"Hakkımızda"} />

      {/* About Section */}
      <AboutSection />

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
