import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";

const SearchResultCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="relative h-[350px] overflow-hidden">
        <div className="absolute top-0 left-0 p-4 bg-black bg-opacity-50 rounded-t-lg text-white">
          <h3 className="text-xl font-semibold">{product.category.name}</h3>
        </div>
        {product.images.map((img, index) => (
          <img
            className="object-cover w-full h-full"
            src={img.url}
            alt={img.alt}
            key={index}
          />
        ))}
      </div>
      <div className="p-4">
        <h1 className="text-lg font-bold text-gray-800">
          {product.productDetail.name}
        </h1>
        <p className="text-sm text-gray-600">{product.productDetail.kitchen}</p>
        <span className="text-sm text-gray-500">
          {product.productDetail.description.slice(0, 20)}...
        </span>
      </div>
      <div className="flex justify-between items-center p-4 border-t border-gray-200">
        <span className="flex items-center text-sm text-gray-700">
          Puan:
          <StarRatings
            rating={product.ratings}
            name="rating"
            starDimension="14px"
            starSpacing="1px"
            starRatedColor="#ffb829"
          />
        </span>
        <span className="text-sm text-gray-800 font-semibold">
          Fiyat: {product.productDetail.price.toFixed(2)}₺
        </span>
      </div>
    </div>
  );
};
SearchResultCard.propTypes = {
  product: PropTypes.shape({
    productDetail: PropTypes.shape({
      name: PropTypes.string,
      kitchen: PropTypes.string,
      description: PropTypes.string,
      price: PropTypes.number,
    }),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      })
    ),
    category: PropTypes.string,
    ratings: PropTypes.number,
  }).isRequired,
};
export default SearchResultCard;
