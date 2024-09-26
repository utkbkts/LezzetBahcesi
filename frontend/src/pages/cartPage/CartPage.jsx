import { Button, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RemoveCartItem } from "../../redux/features/cartSlice";
import { Link } from "react-router-dom";
import { calculateOrderCost } from "../../helpers/helpers";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleCartRemove = (id) => {
    dispatch(RemoveCartItem({ id }));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (title) => <span>{title}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img src={image} alt="Product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Yan Ürünler",
      key: "sideProducts",
      dataIndex: "selectedOptions.sideProducts",
      render: (_, record) => {
        return record.selectedOptions.sideProducts
          .map((item) => item.name)
          .join(", ");
      },
    },
    {
      title: "İçecekler",
      key: "drinks",
      dataIndex: "options.drinks",
      render: (_, record) => {
        return record.selectedOptions.drinks.map((item) => item.name).join(",");
      },
    },
    {
      title: "Cips",
      key: "chips",
      dataIndex: "options.chips",
      render: (_, record) => {
        return <span>{record.selectedOptions.chips.name}</span>;
      },
    },
    {
      title: "Soslar",
      key: "sauce",
      dataIndex: "options.sauce",
      render: (_, record) => {
        return record.selectedOptions.sauce.map((item) => item.name).join(", ");
      },
    },
    {
      title: "Miktar",
      key: "quantity",
      dataIndex: "quantity",
      render: (quantity) => `x${quantity}`,
    },
    {
      title: "Toplam Fiyat",
      key: "totalPrice",
      dataIndex: "totalPrice",
      render: (_, record) => {
        return <span>{record.price.toFixed(2)}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => handleCartRemove(record.id)}
              type="primary"
              className="bg-red-400 hover:!bg-red-500"
            >
              Sil
            </Button>
          </Space>
        );
      },
    },
  ];

  const dataSource = cartItems?.map((item) => ({
    ...item,
    key: item._id,
  }));

  const { itemsPrice, taxPrice, totalPrice } = calculateOrderCost(cartItems);
  return (
    <div className="p-8 bg-gray-100 h-screen flex justify-center flex-col gap-4">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-md">
            <div className="text-6xl text-gray-400 mb-4">
              <span role="img" aria-label="empty-box">
                📦
              </span>
            </div>
            <h1 className="text-2xl open-sans mb-4">
              Sepetinizde Henüz Hiç Ürün Yok.
            </h1>
            <p className="text-gray-600 mb-6">
              Sepetinize ürün eklemek için alışveriş yapmaya başlayabilirsiniz.
            </p>
            <Link to="/" className="inline-block">
              <Button type="primary" className="bg-blue-500 hover:bg-blue-600">
                Alışverişe Başla
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={dataSource}
            className="mb-8 shadow-md"
          />
          <div className="flex gap-6 mb-8 text-black">
            <div className="border rounded-lg p-4 flex-1 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-4">Ödeme Özeti</h4>
              <div className="flex justify-between mb-2">
                <span>Ara Toplam:</span>
                <span>{itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Kurye Ücreti:</span>
                <span className="text-red-400">Ücretsiz</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold ">Vergi Ücreti:</span>
                <span className="font-bold">
                  {itemsPrice ? taxPrice.toFixed(2) : "0.00"} ₺
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold">Toplam Tutar:</span>
                <span className="font-bold">
                  {itemsPrice ? totalPrice.toFixed(2) : "0.00"}
                </span>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  type="primary"
                  className=" bg-green-500 hover:bg-green-600"
                >
                  <Link to={"/shipping"}>Devam et</Link>
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
