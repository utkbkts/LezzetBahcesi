import { Form, Input } from "antd";

const FormsSocialMedia = () => {
  return (
    <div>
      {/* Facebook URL */}
      <Form.Item
        label="Facebook URL"
        name="facebook"
        rules={[
          { required: true, message: "Lütfen Facebook URL'sini giriniz." },
          {
            pattern: /^[A-Za-zğüişçöĞÜİŞÇÖ0-9\s.,?!'":;()\-@&/%]*$/,
            message: "Geçerli bir Facebook adresi giriniz.",
          },
        ]}
      >
        <Input type="text" placeholder="Facebook URL giriniz." />
      </Form.Item>

      {/* Twitter URL */}
      <Form.Item
        label="Twitter URL"
        name="twitter"
        rules={[
          { required: true, message: "Lütfen Twitter URL'sini giriniz." },
          {
            pattern: /^[A-Za-zğüişçöĞÜİŞÇÖ0-9\s.,?!'":;()\-@&/%]*$/,
            message: "Geçerli bir Twitter adresi giriniz.",
          },
        ]}
      >
        <Input type="text" placeholder="Twitter URL giriniz." />
      </Form.Item>

      {/* LinkedIn URL */}
      <Form.Item
        label="LinkedIn URL"
        name="linkedin"
        rules={[
          { required: true, message: "Lütfen LinkedIn URL'sini giriniz." },
          {
            pattern: /^[A-Za-zğüişçöĞÜİŞÇÖ0-9\s.,?!'":;()\-@&/%]*$/,
            message: "Geçerli bir LinkedIn adresi giriniz.",
          },
        ]}
      >
        <Input type="text" placeholder="linkedin URL giriniz." />
      </Form.Item>

      {/* Instagram URL */}
      <Form.Item
        label="Instagram URL"
        name="instagram"
        rules={[
          { required: true, message: "Lütfen Instagram URL'sini giriniz." },
          {
            pattern: /^[A-Za-zğüişçöĞÜİŞÇÖ0-9\s.,?!'":;()\-@&/%]*$/,
            message: "Geçerli bir Instagram adresi giriniz.",
          },
        ]}
      >
        <Input type="text" placeholder="Instagram URL giriniz." />
      </Form.Item>
    </div>
  );
};

export default FormsSocialMedia;
