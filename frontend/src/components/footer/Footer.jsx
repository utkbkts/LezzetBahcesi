import {
  ArrowRight,
  Mail,
  MapPinHouse,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
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
  contact: [
    {
      id: 1,
      name: "Emin Sinan, Kadırga Limanı Cd. No:85, 34130 Fatih/İstanbul",
      icon: <MapPinHouse size={15} />,
    },
    {
      id: 2,
      name: "0454 345 454 54 54",
      icon: <Mail size={15} />,
    },
    {
      id: 3,
      name: "lezzetbahcesi@gmail.com",
      icon: <Phone size={15} />,
    },
  ],
  opening: [
    {
      id: 1,
      name: "Pazartesi - Cumartesi",
      nameSub: "07.00 - 00.00",
    },
    {
      id: 2,
      name: "Pazar",
      nameSub: "07.00 - 23.00",
    },
  ],
  socialmedia: [
    { id: 1, name: "Facebook", icon: <Facebook size={15} /> },
    { id: 2, name: "Twitter", icon: <Twitter size={15} /> },
    { id: 3, name: "Instagram", icon: <Instagram size={15} /> },
    { id: 4, name: "LinkedIn", icon: <Linkedin size={15} /> },
  ],
};
const Footer = () => {
  return (
    <div className="bg-[#0F172B] w-full h-full">
      <div className="grid grid-cols-4 py-8 px-8">
        <div className="flex flex-col">
          <h4 className="pacifico-regular text-[23px] font-[400] text-[#fea116]">
            Şirket Hakkında
          </h4>
          <ul className="flex flex-col gap-2 pt-6">
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
        <div className="flex flex-col">
          <h4 className="pacifico-regular text-[23px] font-[400] text-[#fea116]">
            İletişim
          </h4>
          <ul className="flex flex-col gap-3 pt-6">
            {footer.contact.map((item) => (
              <li
                key={item.id}
                className="font-[400] transition-all duration-400 text-[15px] flex items-center gap-1 hover:scale-105 cursor-pointer "
              >
                {item.icon}
                <span className="w-[400px]">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <h4 className="pacifico-regular text-[23px] font-[400] text-[#fea116]">
            Çalışma Saatlerimiz
          </h4>
          <ul className="flex flex-col gap-5 pt-6">
            {footer.opening.map((item) => (
              <li
                key={item.id}
                className="font-[400] transition-all duration-400 text-[15px] flex items-start flex-col gap-2 hover:scale-105 cursor-pointer"
              >
                <span>{item.name}</span>
                <span> {item.nameSub}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <h4 className="pacifico-regular text-[23px] font-[400] text-[#fea116]">
            Sosyal Medya Hesaplarımız
          </h4>
          <ul className="flex flex-col gap-5 pt-6">
            {footer.socialmedia.map((item) => (
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
      </div>
    </div>
  );
};

export default Footer;
