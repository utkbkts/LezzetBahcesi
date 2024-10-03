import { Select } from "antd";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
import { useCategoryGetQuery } from "../../../../redux/api/CategoryApi";
import SideProduct from "./partials/SideProduct";
import DrinksProducts from "./partials/DrinksProducts";
import PotatosProducts from "./partials/PotatosProducts";

import SaucesProducts from "./partials/SauceProducts";
const Category = ({ tags, setTags, category, setCategory }) => {
  const { data: getData } = useCategoryGetQuery();

  const handleFinish = (values, type) => {
    if (
      type === "sideProduct" &&
      values.sideProduct &&
      values.sideProductPrice
    ) {
      const newProduct = values.sideProduct.toLowerCase().trim();
      const isProductExists = tags.sideProductValue.some(
        (item) => item.sideProduct.toLowerCase() === newProduct
      );
      if (!isProductExists) {
        setTags((prevTags) => ({
          ...prevTags,
          sideProductValue: [
            ...prevTags.sideProductValue,
            {
              id: nanoid(),
              sideProduct: values.sideProduct.trim().toLowerCase(),
              sideProductPrice: values.sideProductPrice,
            },
          ],
        }));
      }
    }

    if (type === "drinkProduct" && values.drinks && values.drinksPrice) {
      const newProduct = values.drinks.toLowerCase().trim();
      const isProductExists = tags.drinksValue.some(
        (item) => item.drinkProduct.toLowerCase() === newProduct
      );

      if (!isProductExists) {
        setTags((prevTags) => ({
          ...prevTags,
          drinksValue: [
            ...prevTags.drinksValue,
            {
              id: nanoid().toString(),
              drinkProduct: values.drinks.toLowerCase().trim(),
              drinkProductPrice: values.drinksPrice,
            },
          ],
        }));
      }
    }

    if (type === "potato" && values.potato && values.potatoPrice) {
      const newProduct = values.potato.toLowerCase().trim();
      const isProductExists = tags.potatoValue.some(
        (item) => item.potato.toLowerCase() === newProduct
      );
      if (!isProductExists) {
        setTags((prevTags) => ({
          ...prevTags,
          potatoValue: [
            ...prevTags.potatoValue,
            {
              id: nanoid(),
              potato: values.potato.toLowerCase().trim(),
              potatoPrice: values.potatoPrice,
            },
          ],
        }));
      }
    }

    if (type === "sauce" && values.sauce && values.saucePrice) {
      const newProduct = values.sauce.toLowerCase().trim();
      const isProductExists = tags.sauceValue.some(
        (item) => item.sauce.toLowerCase() === newProduct
      );
      if (!isProductExists) {
        setTags((prevTags) => ({
          ...prevTags,
          sauceValue: [
            ...prevTags.sauceValue,
            {
              id: nanoid(),
              sauce: values.sauce.toLowerCase().trim(),
              saucePrice: values.saucePrice,
            },
          ],
        }));
      }
    }
  };

  const handleDeleteTag = (id, type) => {
    if (type === "sideProduct") {
      setTags((prevState) => ({
        ...prevState,
        sideProductValue: prevState.sideProductValue.filter(
          (item) => item.id !== id
        ),
      }));
    }
    if (type === "drinkProduct") {
      setTags((prevState) => ({
        ...prevState,
        drinksValue: prevState.drinksValue.filter((item) => item.id !== id),
      }));
    }
    if (type === "potato") {
      setTags((prevState) => ({
        ...prevState,
        potatoValue: prevState.potatoValue.filter((item) => item.id !== id),
      }));
    }
    if (type === "sauce") {
      setTags((prevState) => ({
        ...prevState,
        sauceValue: prevState.sauceValue.filter((item) => item.id !== id),
      }));
    }
  };

  return (
    <div className="w-full">
      <h1>Kategori Seç</h1>
      <hr className="pb-5" />
      <Select
        value={category || "kategori seçiniz"}
        onChange={(value) => setCategory(value)}
        className="w-full mb-4"
      >
        {getData?.category?.map((item) => (
          <Select.Option key={item._id} value={item._id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <h1>Yan ürünler & soslar & içecekler & patates kızartmaları</h1>
      <hr className="pb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {/* Yan Ürünler */}
        <SideProduct
          handleFinish={handleFinish}
          handleDeleteTag={handleDeleteTag}
          tags={tags}
        />

        {/* İçecek Seçimi */}
        <DrinksProducts
          handleFinish={handleFinish}
          handleDeleteTag={handleDeleteTag}
          tags={tags}
        />

        {/* Patates Kızartması */}
        <PotatosProducts
          handleFinish={handleFinish}
          handleDeleteTag={handleDeleteTag}
          tags={tags}
        />

        {/* Soslar */}
        <SaucesProducts
          handleFinish={handleFinish}
          handleDeleteTag={handleDeleteTag}
          tags={tags}
        />
      </div>
    </div>
  );
};

Category.propTypes = {
  tags: PropTypes.shape({
    sideProductValue: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        sideProduct: PropTypes.string.isRequired,
        sideProductPrice: PropTypes.string.isRequired,
      })
    ).isRequired,
    drinksValue: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        drinkProduct: PropTypes.string.isRequired,
        drinkProductPrice: PropTypes.string.isRequired,
      })
    ).isRequired,
    potatoValue: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        potato: PropTypes.string.isRequired,
        potatoPrice: PropTypes.string.isRequired,
      })
    ).isRequired,
    sauceValue: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        sauce: PropTypes.string.isRequired,
        saucePrice: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setTags: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};
export default Category;
