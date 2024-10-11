import logo from "/logo.png";
import tick from "/icons8-tick-48.png";
import { useGetAboutQuery } from "../../../redux/api/AboutApi";
import Loading from "../../../components/loading/Loader";

const AboutMissionSection = () => {
  const { data, isLoading } = useGetAboutQuery();
  const secondsModal = data?.about?.secondsModal;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex w-full relative lg:flex-row flex-col items-center justify-center gap-12">
      <div className="w-1/2">
        <div>
          <img
            src={secondsModal?.secondsImage?.url}
            alt=""
            className="rounded-full"
          />
        </div>
      </div>
      <div className="w-1/2 flex flex-col items-start justify-center">
        <img
          src={logo}
          alt=""
          className="absolute z-[-50] opacity-35 -top-[25%] right-0"
        />
        <h1 className="text-[#005C53] md:text-[36px] text-lg font-extrabold lg:text-start text-center ">
          {secondsModal?.header}
        </h1>
        <p className="text-[#44615e] text-[18px] lg:text-start text-center">
          {secondsModal?.content}
        </p>
        <div className="flex flex-col gap-8 mt-12">
          {secondsModal?.paragraph?.map((item) => (
            <div
              key={item.id}
              className="flex items-center md:flex-row flex-col md:text-start text-center gap-3"
            >
              <img src={tick} alt="" className="w-8 h-8 " />
              <span className="text-[#44615e] text-[18px]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMissionSection;
