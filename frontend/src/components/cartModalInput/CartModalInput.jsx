import { Form, Input } from "antd";

const CartModalInput = () => {
  return (
    <div>
      <Form.Item
        label="Kart Sahibinin Adı"
        name="cardHolderName"
        rules={[
          { required: true, message: "Kart sahibinin adını girin" },
          {
            pattern: /^[a-zA-ZşğüöçıİĞŞ\s]+$/,
            message: "Adınız sadece harf içermelidir.  örn:john doe",
          },
        ]}
      >
        <Input placeholder="Kart Sahibinin Adı" />
      </Form.Item>
      <Form.Item
        label="Kart Numarası"
        name="cardNumber"
        rules={[
          { required: true, message: "Kart numarasını girin" },
          {
            pattern: /^[0-9]{16}$/,
            message:
              "Kart numarası 16 haneli bir sayı olmalıdır örn:4729150000000005",
          },
        ]}
      >
        <Input placeholder="Kart Numarası" />
      </Form.Item>
      <Form.Item
        label="Son Kullanım Ayı"
        name="expireMonth"
        rules={[
          { required: true, message: "Son kullanım ayını girin" },
          {
            pattern: /^[0-9]{2}$/,
            message: "örn:12",
          },
        ]}
      >
        <Input placeholder="Son Kullanım Ayı" />
      </Form.Item>
      <Form.Item
        label="Son Kullanım Yılı"
        name="expireYear"
        rules={[
          { required: true, message: "Son kullanım yılını girin" },
          {
            pattern: /^[0-9]{2}$/,
            message: "örn:30",
          },
        ]}
      >
        <Input placeholder="Son Kullanım Yılı" />
      </Form.Item>
      <Form.Item
        label="CVC"
        name="cvc"
        rules={[
          { required: true, message: "CVC kodunu girin" },
          {
            pattern: /^[0-9]{3}$/,
            message: "örn:123",
          },
        ]}
      >
        <Input placeholder="CVC" />
      </Form.Item>
    </div>
  );
};

export default CartModalInput;
