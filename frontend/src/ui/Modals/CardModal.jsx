import { useState } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
const CardModal = ({ isOpen, onClose, productDetail, images, tags, _id }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    drinks: [],
    sideProducts: [],
    chips: "",
    sauce: [],
    special: "",
  });
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  //sideProduct start
  const handleSideChange = (e) => {
    const { name, checked, value } = e.target;

    setSelectedOptions((prevState) => {
      if (checked) {
        return {
          ...prevState,
          sideProducts: [
            ...prevState.sideProducts,
            { name, price: Number(value) },
          ],
        };
      } else {
        return {
          ...prevState,
          sideProducts: prevState.sideProducts.filter(
            (item) => item.name !== name
          ),
        };
      }
    });
  };
  //sideProduct finish

  //drinkProduct start

  const handleDrinkChange = (e) => {
    const { name, value, checked } = e.target;

    setSelectedOptions((prevState) => {
      if (checked) {
        return {
          ...prevState,
          drinks: [...prevState.drinks, { name, price: Number(value) }],
        };
      } else {
        return {
          ...prevState,
          drinks: prevState.drinks.filter((item) => item.name !== name),
        };
      }
    });
  };

  //drinkProduct finish

  //chips Start
  const handlePotatoChange = (e) => {
    const { name, value, checked } = e.target;

    setSelectedOptions((prevState) => {
      if (checked) {
        return {
          ...prevState,
          chips: { name, price: Number(value) },
        };
      } else {
        return {
          ...prevState,
          chips: { price: Number(0) },
        };
      }
    });
  };

  //chips finish

  //sauce start

  const handleSauceChange = (e) => {
    const { name, value, checked } = e.target;

    setSelectedOptions((prevState) => {
      if (checked) {
        return {
          ...prevState,
          sauce: [...prevState.sauce, { name, price: Number(value) }],
        };
      } else {
        return {
          ...prevState,
          sauce: prevState.sauce.filter((item) => item.name !== name),
        };
      }
    });
  };

  //sauce finish

  // Toplam fiyat hesaplama
  const calculateTotalPrice = () => {
    const basePrice = Number(productDetail.price) || 0;
    const sideProductsTotal = selectedOptions.sideProducts.reduce(
      (total, item) => total + (item.price || 0),
      0
    );
    const drinksTotal = selectedOptions.drinks.reduce(
      (total, item) => total + (item.price || 0),
      0
    );
    const chipsTotal = selectedOptions.chips.price || 0;
    const sauceTotal = selectedOptions.sauce.reduce(
      (total, item) => total + (item.price || 0),
      0
    );

    return (
      basePrice + sideProductsTotal + drinksTotal + chipsTotal + sauceTotal
    );
  };
  const handleAddToCard = () => {
    const cartItems = {
      product: _id,
      title: productDetail.title,
      price: calculateTotalPrice(),
      selectedOptions: selectedOptions,
      image: images.length > 0 ? images[0]?.url : "",
      quantity: quantity,
    };
    dispatch(addToCart(cartItems));
  };
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      className="rounded-lg p-5 "
    >
      <img
        className="w-72 h-72 object-cover rounded-md"
        src={images.length > 0 ? images[0]?.url : ""}
        alt="Product"
      />
      <h1 className="text-lg  font-semibold">{productDetail.title}</h1>
      <p className="text-base">{productDetail.description}</p>

      <div className="my-4 ">
        <h2 className="text-lg font-semibold !text-black">Yan Ürünler:</h2>
        {tags.sideProductValue.map((item) => (
          <div key={item._id} className="flex gap-1 items-center">
            <input
              type="checkbox"
              name={item.sideProduct}
              onChange={handleSideChange}
              value={item.sideProductPrice}
            />
            <label>
              {item.sideProduct} -{" "}
              {parseFloat(item.sideProductPrice).toFixed(2)}₺
            </label>
          </div>
        ))}
      </div>

      <div className="my-4 ">
        <h2 className="text-lg font-semibold !text-black">İçecekler:</h2>
        {tags.drinksValue.map((drink) => (
          <div className="flex gap-1 items-center" key={drink._id}>
            <input
              type="checkbox"
              onChange={handleDrinkChange}
              name={drink.drinkProduct}
              value={drink.drinkProductPrice}
            />
            <label>
              {drink.drinkProduct} -{" "}
              {parseFloat(drink.drinkProductPrice).toFixed(2)}₺
            </label>
          </div>
        ))}
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold !text-black">
          Patates Kızartması:
        </h2>
        {tags.potatoValue.map((item) => (
          <div className="flex gap-1 items-center" key={item._id}>
            <input
              type="checkbox"
              onChange={handlePotatoChange}
              name={item.potato}
              value={item.potatoPrice}
              checked={selectedOptions.chips?.name === item.potato}
            />
            <label>
              {item.potato} - {parseFloat(item.potatoPrice).toFixed(2)}₺
            </label>
          </div>
        ))}
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold !text-black">Soslar:</h2>
        {tags.sauceValue.map((item) => (
          <div className="flex gap-1 items-center" key={item._id}>
            <input
              type="checkbox"
              onChange={handleSauceChange}
              name={item.sauce}
              value={item.saucePrice}
            />
            <label>
              {item.sauce} - {parseFloat(item.saucePrice).toFixed(2)}₺
            </label>
          </div>
        ))}
      </div>

      <div className="my-4">
        <h2 className="text-lg font-semibold !text-black">Özel Not:</h2>
        <textarea
          value={selectedOptions.special}
          onChange={(e) =>
            setSelectedOptions((prevState) => ({
              ...prevState,
              special: e.target.value,
            }))
          }
          rows={3}
          className="w-full border border-gray-400 p-2 rounded-md outline-none"
        ></textarea>
      </div>

      <div className="flex justify-between items-center my-4">
        <span className="text-lg font-semibold">Toplam Fiyat:</span>
        <span className="text-lg font-semibold">{calculateTotalPrice()}₺</span>
      </div>

      <div className="flex justify-end gap-2">
        <div className="flex items-center gap-2">
          <Button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
            -
          </Button>
          <span>{quantity}</span>
          <Button onClick={() => setQuantity((prev) => prev + 1)}>+</Button>
        </div>
        <Button type="primary" onClick={handleAddToCard} className="mr-2">
          Sepete Ekle
        </Button>
        <Button onClick={""}>Favorilere Ekle</Button>
      </div>
    </Modal>
  );
};

CardModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  productDetail: PropTypes.object,
  images: PropTypes.array,
  tags: PropTypes.object,
  _id: PropTypes.string,
};

export default CardModal;
