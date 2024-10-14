import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import {
  Balance,
  Diet,
  Ecology,
  GlutenFree,
  Microwave,
  Muscle,
  Natural,
  PlantBase,
  Star,
} from "../../ui/svg/SvgAll";
import { Typography } from "antd";
import { useProductByIdQuery } from "../../redux/api/ProductApi";
import NewReviews from "../../components/newReviews/NewReviews";
import AllReviews from "../../components/allReviews/AllReviews";
import { useSelector } from "react-redux";
import CardModal from "../../ui/Modals/CardModal";

const { Title } = Typography;

const ProductDetails = () => {
  const { id } = useParams();
  const { data } = useProductByIdQuery(id);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState([]);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (data?.product?.images.length > 0) {
      setActiveImg(data.product.images[0]);
    }
  }, [data]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="w-full h-full text-black mt-[80px]">
        <div className="flex w-full md:h-[600px]  h-full bg-[#F4EEDC] md:flex-row flex-col  justify-center items-center">
          <div className="w-1/2 flex justify-end mt-12">
            <div className="flex flex-col justify-center md:items-start gap-2 items-center">
              <>
                <img
                  src={activeImg.url}
                  alt="Main image"
                  className="w-full h-[300px] object-cover rounded-md mb-4"
                />

                <div className="grid grid-cols-4 gap-3">
                  {data?.product?.images?.map((img, index) => {
                    return (
                      <img
                        key={index}
                        src={img.url}
                        onClick={() => setActiveImg(img)}
                        alt={`Image ${index}`}
                        className={`w-[100px] h-[100px] object-cover rounded-md  cursor-pointer`}
                      />
                    );
                  })}
                </div>
              </>
            </div>
          </div>
          <div className="flex flex-col p-6 rounded-lg text-center md:text-start w-2/3">
            <h3 className="text-2xl font-bold text-red-600 mb-4 animate-pulse">
              En Çok Satanlar da bu ürün var.
            </h3>
            <h1 className="text-xl font-semibold mb-4">
              <span className="text-gray-700 open-sans">Ürün İsmi:</span>{" "}
              <span className="text-gray-900 font-medium">
                {data?.product?.productDetail?.title}
              </span>
            </h1>
            <div className="space-y-4">
              <div className="text-gray-800 font-semibold">
                Ürün Fiyatı:{" "}
                <span className="text-green-600">
                  {data?.product?.productDetail?.price.toFixed(2)}₺
                </span>
              </div>
              <div className="text-gray-800 font-semibold">
                Stok:{" "}
                <span className="text-blue-600">
                  {data?.product?.productDetail?.stock} Adet
                </span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="mt-4 py-2 px-6 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sepete Ekle
              </button>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400" />
                  <div className="flex items-center gap-1">
                    Değerlendirmeler:
                    <StarRatings
                      rating={data?.product?.ratings}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      name="ratings"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </div>
                </div>
                <div className="text-gray-600">
                  Değerlendirme Puanı:{" "}
                  <span className="font-semibold">
                    {data?.product?.ratings}
                  </span>{" "}
                  |{" "}
                  <span className="font-semibold">
                    {data?.product?.numOfReviews} yorum
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#351E30] text-white p-6 rounded-lg shadow-md w-full flex md:h-[500px] h-full md:flex-row flex-col items-center justify-center">
          <div className="mb-6 md:w-1/2 w-full flex justify-center flex-col">
            <span className="text-lg font-semibold">İçerik:</span>
            <p className="mt-2 text-[16px] leading-relaxed">
              {data?.product?.productDetail?.details}
            </p>
          </div>
          <div className=" md:w-1/2 w-full h-full flex items-center">
            <div className="grid grid-cols-4 gap-4  ">
              <div className="flex items-center flex-col gap-2">
                <PlantBase className="w-6 h-6" />
                <span className="text-sm font-medium">Bitki Bazlı</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <GlutenFree className="w-6 h-6" />
                <span className="text-sm font-medium">Gluten Free</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <Natural className="w-6 h-6" />
                <span className="text-sm font-medium">Doğal</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <Diet className="w-6 h-6" />
                <span className="text-sm font-medium">Diyet</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <Muscle className="w-6 h-6" />
                <span className="text-sm font-medium">Kas Yükseltici</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <Microwave className="w-6 h-6" />
                <span className="text-sm font-medium">
                  Mikrodalgada Pişirilebilir
                </span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <Balance className="w-6 h-6" />
                <span className="text-sm font-medium">Dengeli</span>
              </div>
              <div className="flex items-center flex-col gap-2">
                <Ecology className="w-6 h-6" />
                <span className="text-sm font-medium">Ekolojik</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <div>
            <h1 className="text-center mt-5 mb-5">Beslenme Bilgileri</h1>
            <hr />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-[#ececec]">
                <tr>
                  <th scope="col" className="px-6 py-3 border border-gray-400">
                    1 Porsiyon
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-400">
                    Porsiyon Başına
                  </th>
                  <th scope="col" className="px-6 py-3 border border-gray-400">
                    100g
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.product?.nutriation?.nutriationValue.map((item) => (
                  <tr key={item._id} className="bg-[#f4eedc] ">
                    <td className="px-6 py-4 border border-gray-400">
                      {item.nutriation}
                    </td>
                    <td className="px-6 py-4 border border-gray-400">
                      {item.nutriationPortion}
                    </td>
                    <td className="px-6 py-4 border border-gray-400">
                      {item.nutriationGram}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="comment-section p-4">
          {user ? (
            <NewReviews data={data} />
          ) : (
            <h1 className="open-sans text-center mt-4 mb-4 !font-light">
              Yorum yapmak için ilk önce giriş yapınız.
            </h1>
          )}
          <Title level={4}>Diğer Yorumlar</Title>
          <div className="p-4 bg-gray-50 rounded-lg shadow-md overflow-x-auto h-[500px]">
            {data?.product?.reviews?.map((review) => (
              <AllReviews key={review._id} review={review} data={data} />
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CardModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          tags={data.product.tags}
          nutriation={data.product.nutriation}
          images={data.product.images}
          productDetail={data.product.productDetail}
          category={data.product.category}
          ratings={data.product.ratings}
          _id={data.product._id}
        />
      )}
    </>
  );
};

export default ProductDetails;
