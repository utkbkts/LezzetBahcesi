import { useGetMenuQuery } from "../../../redux/api/MenuApi";
import menu5 from "/menuPage/pasta-menu.jpg";
import menu2 from "/menuPage/menu-before.jpg";
import menu8 from "/menuPage/divider-free-img.png";

const SectionOne = () => {
  const { data } = useGetMenuQuery();
  return (
    <div className="min-h-screen mt-[100px] relative text-black">
      <img src={menu2} alt="" className="absolute right-0 z-[-10]" />
      <div className="max-w-5xl mx-auto ">
        <div className="flex mds:flex-row flex-col items-center justify-center gap-12 min-h-screen ">
          <div className="w-1/2 h-full sm:block hidden">
            <div className="bg-pasta w-full h-full">
              <div className="img-wrapper">
                <img
                  src={menu5}
                  alt="image"
                  className="w-full h-full rounded-md shadow-xl hover:scale-105 duration-300 transition-all"
                />
              </div>
            </div>
          </div>
          <div className="mds:w-1/2 w-full">
            <div className="flex flex-col items-center justify-center">
              <h1 className="berkshire-swash-regular">
                {data?.menu[0]?.titleOne}
              </h1>
              <img src={menu8} alt="" />
            </div>
            <div>
              {data?.menu[0]?.contentOne.map((item) => (
                <>
                  {" "}
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-2 mt-12 mds:flex-row flex-col mds:text-start text-center"
                  >
                    <div className="flex flex-col gap-2">
                      <span>{item.contentTitle}</span>
                      <p className="text-gray-500 pb-2 ">{item.contentDesc}</p>
                    </div>
                    <div>
                      <span>{item.price}₺</span>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionOne;
