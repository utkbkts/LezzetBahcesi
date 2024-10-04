import chef from "/about/chef.jpg";
import chef2 from "/about/chef2.jpg";

const AboutChefSection = () => {
  return (
    <>
      {" "}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#005C53]  text-center">
          Şeflerimizin Sanatı
        </h2>
        <p className="text-lg text-[#44615e] mt-4  text-center">
          En kaliteli malzemelerle, ustalıkla hazırlanan lezzetler.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
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
              Geleneksel lezzetleri modern dokunuşlarla buluşturan usta şefimiz.
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
    </>
  );
};

export default AboutChefSection;
