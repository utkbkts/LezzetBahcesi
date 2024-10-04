import React from "react";
import picture1 from "/about/picture-1.png";
import picture3 from "/about/picture-3.png";
import picture4 from "/about/picture-4.png";
import picture5 from "/about/picture-5.png";
import burgerpattern from "/about/burgerpattern.png";
const AboutSocialMediaSection = () => {
  return (
    <React.Fragment>
      <img src={burgerpattern} alt="" className="absolute lg:block hidden" />
      <div className="flex flex-col gap-12">
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="font-extrabold text-4xl text-center text-[#005C53]">
            Bizi sosyal medya hesaplarımızdan takip edebilirsiniz
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:w-[600px] w-full pt-8 text-center">
            Lezzet dolu anlar, en yeni güncellemeler ve özel fırsatlar için
            Instagram sayfamızı takip edin! Lezzet Bahçesi ailesinin bir parçası
            olun ve keyifli yemek yolculuğumuza ortak olun!
          </p>
        </div>
        <div className="w-full items-center justify-center lg:flex hidden">
          <img src={picture1} alt="picture1" className="m-[-19px] pt-32" />
          <img src={picture3} alt="picture3" />
          <img src={picture4} alt="picture4" className="m-[-19px] pt-24" />
          <img src={picture5} alt="picture5" />
        </div>
      </div>
      <img
        src={burgerpattern}
        alt=""
        className="absolute right-0 lg:block hidden"
      />
    </React.Fragment>
  );
};

export default AboutSocialMediaSection;
