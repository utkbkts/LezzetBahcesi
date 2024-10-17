import { useGetMenuQuery } from "../../../redux/api/MenuApi";
import menu8 from "/menuPage/divider-free-img.png";
import menu9 from "/menuPage/hamburger.jpg";

const SectionThree = () => {
  const { data } = useGetMenuQuery();

  return (
    <div className="flex gap-12 min-h-screen mds:flex-row flex-col items-center justify-center">
      <div className="w-1/2 h-full sm:block hidden">
        <div className="bg-pasta w-full h-full">
          <div className="img-wrapper">
            <img
              src={menu9}
              alt="image"
              className="w-full h-full rounded-md shadow-xl hover:scale-105 duration-300 transition-all"
            />
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex flex-col items-center justify-center">
          <h1 className="berkshire-swash-regular ">
            {data.menu[0].titleThree}
          </h1>
          <img src={menu8} alt="" />
        </div>
        {data?.menu[0].contentThree.map((item) => (
          <>
            <div className="mds:text-start text-center">
              <div className="flex items-center justify-between gap-2 mt-12 mds:flex-row flex-col">
                <div className="flex flex-col gap-2">
                  <span>{item.contentTitle}</span>
                  <p className="text-gray-500 pb-2 ">{item.contentDesc}</p>
                </div>
                <div>
                  <span>{item.price}₺</span>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SectionThree;
