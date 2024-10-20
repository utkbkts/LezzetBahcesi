import Loading from "../../../components/loading/Loader";
import { useGetAboutQuery } from "../../../redux/api/AboutApi";
import chef2 from "/about/chef2.jpg";

const AboutChefSection = () => {
  const { data, isLoading } = useGetAboutQuery();
  const secondsModal = data?.about?.chefs1;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      {" "}
      <div className="text-center mb-12 ">
        <h2 className="text-4xl font-bold text-[#005C53]  text-center">
          {secondsModal?.title}
        </h2>
        <p className="text-lg text-[#44615e] mt-4  text-center">
          {secondsModal?.paragraph}
        </p>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* İlk Şef Görseli ve İçerik */}
        <div className="relative w-full md:w-1/2 group">
          <img
            src={secondsModal?.imageChef?.url}
            alt="Chef preparing a meal"
            className="w-full h-[500px] object-cover rounded-lg shadow-lg transform transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 rounded-lg group-hover:scale-105 transform transition-transform duration-500"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="text-3xl font-semibold">{secondsModal?.header}</h3>
            <p className="text-md mt-2">{secondsModal?.content}</p>
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
