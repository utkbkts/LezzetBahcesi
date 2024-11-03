import { Input } from "antd";
import Hero from "../../components/hero/Hero";
import menu7 from "/menuPage/img-def.png";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import FavoriteCard from "./partials/FavoriteCard";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../layouts/MetaData";
const FavoritePage = () => {
  const { favoriteItems } = useSelector((state) => state.cart);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (value) {
      navigate(`/favorite?query=${encodeURIComponent(value.trim())}`);
    } else {
      navigate("/favorite");
    }
  };
  const filteredFavorites = favoriteItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <MetaData title={`Favorilerim`} />

      <div className="relative">
        <Hero
          classNameHero={"bg-favorite"}
          title={"İstek Listem"}
          titleClass={"berkshire-swash-regular"}
          subTitle={"favorileriniz"}
          titleMainClass={"items-center justify-center"}
        />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <img src={menu7} alt="image" />
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-24">
        {favoriteItems.length > 0 ? (
          <>
            <div className="relative flex w-full justify-end">
              <Input
                className=" w-[30%]"
                placeholder="isim veya kategoriye göre arayın"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <Search className="absolute right-2 top-2 text-black" size={15} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {filteredFavorites?.map((fav) => (
                <FavoriteCard
                  key={fav.product}
                  images={fav.images}
                  price={fav.price}
                  title={fav.title}
                  ratings={fav.ratings}
                  id={fav.product}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mt-10">
            <h2 className="text-2xl font-semibold text-gray-700">
              İstek listeniz boş
            </h2>
            <p className="text-gray-500 mt-2">
              Favori ürünlerinizi ekleyerek istek listenizi oluşturun!
            </p>
            <Link to={"/"}>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Alışverişe Başla
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;
