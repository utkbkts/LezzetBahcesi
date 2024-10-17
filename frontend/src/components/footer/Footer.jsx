import {
  ArrowRight,
  Mail,
  MapPinHouse,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { useGetFooterQuery } from "../../redux/api/FooterApi";
import { Link } from "react-router-dom";
const footer = {
  company: [
    {
      id: 1,
      name: "Hakkımızda",
      icon: <ArrowRight size={15} />,
    },
    {
      id: 2,
      name: "İletişim",
      icon: <ArrowRight size={15} />,
    },
    {
      id: 3,
      name: "Rezervasyon",
      icon: <ArrowRight size={15} />,
    },
    {
      id: 4,
      name: "Yasal haklar ve şartlar",
      icon: <ArrowRight size={15} />,
    },
  ],
};
const Footer = () => {
  const { data: footerGetData } = useGetFooterQuery();
  return (
    <div className="bg-[#0F172B] w-full h-full">
      <div className="grid xl:grid-cols-4 mds:grid-cols-3 grid-cols-1 py-8 px-8 mds:gap-0 gap-12">
        <div className="flex flex-col items-center justify-center">
          <h4 className="pacifico-regular text-[23px] font-[400] text-[#fea116]">
            Şirket Hakkında
          </h4>
          <ul className="flex flex-col gap-2 pt-6 mds:items-start items-center justify-center">
            {footer.company.map((item) => (
              <li
                key={item.id}
                className="font-[400] transition-all duration-400 text-[15px] flex items-center gap-1 hover:scale-105 cursor-pointer"
              >
                {item.icon}
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="pacifico-regular text-[23px] font-[400] text-[#fea116]">
            İletişim
          </h4>
          <ul className="flex flex-col gap-3 pt-6 items-center justify-center">
            <li className="font-[400] transition-all duration-400 text-[15px] flex mds:flex-row flex-col mds:text-start text-center items-center gap-1  ">
              <MapPinHouse size={15} />
              <span className="md:w-[400px] w-full">
                {footerGetData?.footer[0]?.contact?.address}
              </span>
            </li>
            <li className="font-[400] transition-all duration-400 text-[15px] flex mds:flex-row flex-col mds:text-start text-center items-center gap-1  ">
              <Mail size={15} />
              <span className="md:w-[400px] w-full">
                {footerGetData?.footer[0]?.contact?.email}
              </span>
            </li>
            <li className="font-[400] transition-all duration-400 text-[15px] flex mds:flex-row flex-col mds:text-start text-center items-center gap-1  ">
              <Phone size={15} />
              <span className="md:w-[400px] w-full">
                {footerGetData?.footer[0]?.contact?.phone}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="pacifico-regular text-[23px] font-[400] text-[#fea116]">
            Çalışma Saatlerimiz
          </h4>
          <ul className="flex mds:flex-col flex-row gap-5 pt-6 mds:items-start items-center justify-center">
            <li className="font-[400] transition-all duration-400 text-[15px] flex items-start flex-col gap-2 ">
              {footerGetData?.footer[0]?.workingHours?.map((item) => (
                <>
                  <span>{item.day}</span>
                  <span>{item.hours}</span>
                </>
              ))}
            </li>
          </ul>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="pacifico-regular text-[23px] font-[400] text-[#fea116]">
            Sosyal Medya Hesaplarımız
          </h4>
          <ul className="flex flex-col gap-2 pt-6 items-center justify-center">
            <Link
              to={footerGetData?.footer[0]?.socialMedia?.facebook}
              target="_blank"
            >
              <li className="font-[400] transition-all duration-400 text-[15px] flex items-center gap-1 hover:scale-105 cursor-pointer">
                <Facebook size={15} />
                Facebook
              </li>
            </Link>
            <Link
              to={footerGetData?.footer[0]?.socialMedia?.twitter}
              target="_blank"
            >
              <li className="font-[400] transition-all duration-400 text-[15px] flex items-center gap-1 hover:scale-105 cursor-pointer">
                <img
                  src="/x.png"
                  className="w-5 h-5 bg-white rounded-full"
                  alt=""
                />
                X(twitter)
              </li>
            </Link>
            <Link
              to={footerGetData?.footer[0]?.socialMedia?.linkedin}
              target="_blank"
            >
              <li className="font-[400] transition-all duration-400 text-[15px] flex items-center gap-1 hover:scale-105 cursor-pointer">
                <Linkedin size={15} />
                Linkedin
              </li>
            </Link>
            <Link
              to={footerGetData?.footer[0]?.socialMedia?.instagram}
              target="_blank"
            >
              <li className="font-[400] transition-all duration-400 text-[15px] flex items-center gap-1 hover:scale-105 cursor-pointer">
                <Instagram size={15} />
                Instagram
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
