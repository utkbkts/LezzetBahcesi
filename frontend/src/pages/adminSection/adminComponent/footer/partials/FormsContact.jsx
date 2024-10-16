import { Form, Input } from "antd";

const FooterContact = () => {
  return (
    <div>
      {" "}
      <Form.Item
        label="Adres Bilgileri"
        name="address"
        rules={[{ required: true, message: "Lütfen adres bilgisini giriniz." }]}
      >
        <Input type="text" placeholder="Adres" />
      </Form.Item>
      <Form.Item
        label="Telefon Numarası"
        name="phone"
        rules={[
          { required: true, message: "Lütfen telefon numaranızı giriniz." },
          {
            pattern: /^[A-Za-zğüişçöĞÜİŞÇÖ0-9\s.,?!'":;()\-@&%]*$/,
            message: "Geçerli bir telefon numarası giriniz.",
          },
        ]}
      >
        <Input type="text" placeholder="Telefon Numarası" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Lütfen email adresinizi giriniz." },
          {
            pattern: /^[A-Za-zğüişçöĞÜİŞÇÖ0-9\s.,?!'":;()\-@&%]*$/,
            message: "Geçerli bir email  giriniz.",
          },
        ]}
      >
        <Input type="email" placeholder="Email" />
      </Form.Item>
    </div>
  );
};

export default FooterContact;
