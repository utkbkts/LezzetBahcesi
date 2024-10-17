import menu6 from "/menuPage/pizza-menu.jpg";
import menu8 from "/menuPage/divider-free-img.png";
import { useGetMenuQuery } from "../../../redux/api/MenuApi";

const SectionTwo = () => {
  const { data } = useGetMenuQuery();

  return (
    <div>
      <div className="max-w-5xl mx-auto ">
        <div className="flex gap-12 min-h-screen mds:flex-row  flex-col-reverse items-center justify-center">
          <div className="w-1/2 ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="berkshire-swash-regular ">
                {data?.menu[0].titleTwo}
              </h1>
              <img src={menu8} alt="" />
            </div>
            <div className="mds:text-start text-center">
              {data?.menu[0].contentTwo.map((item) => (
                <>
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-2 mt-12 mds:flex-row flex-col"
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
          <div className="w-1/2 h-full sm:block hidden">
            <div className="bg-pasta w-full h-full">
              <div className="img-wrapper">
                <img
                  src={menu6}
                  alt="image"
                  className="w-full h-full rounded-md shadow-xl hover:scale-105 duration-300 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
