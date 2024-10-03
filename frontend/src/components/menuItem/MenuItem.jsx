import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import CardModal from "../../ui/Modals/CardModal";
const MenuItem = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { productDetail, nutriation, images, category, tags, ratings, _id } =
    props;

  const [isModalOpen, setModalOpen] = useState(false);

  const prevImageState = () => {
    const firstSlide = currentIndex === 0;
    const newIndex = firstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextImageState = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <React.Fragment>
      <div>
        <div className=" bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden transform transition-transform h-full w-full hover:shadow-2xl">
          <div className="menu-image-container relative h-64">
            <img
              src={images[currentIndex]?.url}
              alt={"Card"}
              className="menu-image absolute w-full h-64 object-cover rounded-t-2xl transition-transform duration-300 ease-in-out hover:scale-110"
            />
            <div
              onClick={prevImageState}
              className="absolute left-0 top-1/2 bg-black/80 cursor-pointer"
            >
              <MdArrowLeft size={40} className="text-white" />
            </div>
            <div
              onClick={nextImageState}
              className="absolute right-0 top-1/2 bg-black/80 cursor-pointer"
            >
              <MdArrowRight size={40} className="text-white" />
            </div>
            <div className="absolute top-0 left-0 p-4 bg-black bg-opacity-50 rounded-t-2xl text-white">
              <h3 className="text-xl font-semibold">{productDetail.kitchen}</h3>
            </div>
          </div>
          <div className="menu-content p-6 space-y-4">
            <h4 className="text-2xl font-bold text-gray-800">
              {productDetail.title}
            </h4>
            <p className="text-gray-600 text-sm">
              {productDetail?.description?.slice(0, 50)}
            </p>
            <div className="flex items-center justify-between">
              <div className="menu-rating flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  Puan:
                  <StarRatings
                    rating={ratings}
                    name="rating"
                    starDimension="14px"
                    starSpacing="1px"
                    starRatedColor="#ffb829"
                  />
                </span>
                <span className="text-yellow-500 font-semibold text-lg">
                  {ratings}
                </span>
              </div>

              <span className="text-lg font-bold text-gray-900">
                {parseFloat(productDetail.price).toLocaleString("tr-TR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                ₺
              </span>
            </div>
            <div className="flex flex-col gap-4 items-center">
              <Button
                color="primary"
                onClick={() => setModalOpen(true)}
                className="w-full py-2 px-4 font-semibold rounded-lg shadow-md"
              >
                <ShoppingCartOutlined size={20} />
                Sepete Ekle
              </Button>
              <Link to={`/product/${_id}`} className="w-full">
                <Button
                  color="primary"
                  className="w-full py-2 px-4 font-semibold rounded-lg shadow-md"
                >
                  <EyeOutlined size={20} />
                  Detay
                </Button>
              </Link>
              {productDetail.stock <= 10 && (
                <div className="absolute top-0 right-0 p-4 bg-black bg-opacity-50 rounded-t-2xl text-white">
                  <p className="text-red-500 font-bold animate-pulse w-32 text-center text-[10px]">
                    Bu ürün den son {productDetail.stock} adet kalmıştır.Acele
                    Et
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CardModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          tags={tags}
          nutriation={nutriation}
          images={images}
          productDetail={productDetail}
          category={category}
          ratings={ratings}
          _id={_id}
        />
      )}
    </React.Fragment>
  );
};
MenuItem.propTypes = {
  productDetail: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    kitchen: PropTypes.string,
    stock: PropTypes.number,
  }),
  nutriation: PropTypes.shape({
    nutriationValue: PropTypes.arrayOf(
      PropTypes.shape({
        nutriation: PropTypes.string,
        nutriationGram: PropTypes.string,
        nutriationPortion: PropTypes.string,
      })
    ),
  }),
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ),
  category: PropTypes.object,
  tags: PropTypes.shape({
    drinksValue: PropTypes.arrayOf(
      PropTypes.shape({
        drinkProduct: PropTypes.string,
        drinkProductPrice: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    potatoValue: PropTypes.arrayOf(
      PropTypes.shape({
        potato: PropTypes.string,
        potatoPrice: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    sauceValue: PropTypes.arrayOf(
      PropTypes.shape({
        sauce: PropTypes.string,
        saucePrice: PropTypes.string,
        id: PropTypes.string,
      })
    ),
    sideProductValue: PropTypes.arrayOf(
      PropTypes.shape({
        sideProduct: PropTypes.string,
        sideProductPrice: PropTypes.string,
        id: PropTypes.string,
      })
    ),
  }),
  ratings: PropTypes.number,
  _id: PropTypes.string,
};
export default MenuItem;
