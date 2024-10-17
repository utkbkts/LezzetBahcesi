import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { IoMdHeart } from "react-icons/io";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { removeFavorite } from "../../../redux/features/cartSlice";

const FavoriteCard = ({ images, price, title, id, ratings }) => {
  const dispatch = useDispatch();
  return (
    <div className="text-black mt-12 border border-gray-400 rounded-md w-full h-[350px] mb-4 relative">
      <IoMdHeart
        onClick={() => dispatch(removeFavorite(id))}
        className="absolute top-2 right-2  cursor-pointer"
        color="red"
        size={30}
      />
      <div className="flex flex-col h-full ">
        <div className="w-full ">
          <img
            src={images}
            alt="images"
            className="w-full  object-cover h-[200px] rounded-md"
          />
        </div>
        <div className="w-full flex flex-col justify-between h-full pt-4 p-2">
          <div className="flex items-center justify-between ">
            <span>{title}</span>
            <span>{price.toFixed(2)}₺</span>
          </div>
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
          <div className="h-full flex items-end">
            <Link to={`/product/${id}`} className="w-full">
              <Button
                color="primary"
                className="w-full py-2 px-4 font-semibold rounded-lg shadow-md"
              >
                <EyeOutlined size={20} />
                Detay
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
FavoriteCard.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
    })
  ),
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
  id: PropTypes.string,
  ratings: PropTypes.number,
};
export default FavoriteCard;
