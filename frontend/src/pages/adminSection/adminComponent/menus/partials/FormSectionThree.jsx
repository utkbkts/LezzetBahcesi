import { Form, Input, Button, Space } from "antd";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
const FormSectionThree = ({ contentItemsThree, setContentItemsThree }) => {
  const handleContentChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = contentItemsThree.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setContentItemsThree(newItems);
  };

  const addContentItem = () => {
    if (contentItemsThree.length > 4) {
      return toast.success("en fazla 4 detay ekleyebilirsiniz.");
    }
    setContentItemsThree([
      ...contentItemsThree,
      { contentTitle: "", contentDesc: "", price: "" },
    ]);
  };

  const removeContentItem = (index) => {
    const filter = contentItemsThree.filter((_, i) => i !== index);
    setContentItemsThree(filter);
  };

  return (
    <div>
      <h1>3.alan</h1>
      <Form.Item
        label="Ana başlık"
        name="titleThree"
        rules={[
          { required: true, message: "Lütfen ana başlık bilgisini giriniz." },
          {
            pattern: /^[A-Za-zğüişçöĞÜİŞÇı0-9\s.,?!'":;()\-@&%]*$/,
            message: "özel karakter giremezsiniz.",
          },
        ]}
      >
        <Input type="text" placeholder="Birinci bölüm başlık" />
      </Form.Item>

      {contentItemsThree.map((item, index) => (
        <Space
          key={index}
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item
            label={`Ürün başlığı ${index + 1}`}
            name={`contentTitle3 ${index}`}
            initialValue={item.contentDesc}
            rules={[
              {
                required: true,
                message: "Lütfen ürün başlık bilgisini giriniz.",
              },
              {
                pattern: /^[A-Za-zğüişçöĞÜİŞÇı0-9\s.,?!'":;()\-@&%]*$/,
                message: "özel karakter giremezsiniz.",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Ürün başlığı"
              value={item.contentTitle}
              name="contentTitle"
              onChange={(e) => handleContentChange(index, e)}
            />
          </Form.Item>

          <Form.Item
            label={`Açıklama ${index + 1}`}
            name={`contentDesc3 ${index}`}
            initialValue={item.contentDesc}
            rules={[
              { required: true, message: "Lütfen açıklama bilgisini giriniz." },
              {
                pattern: /^[A-Za-zğüişçöĞÜİŞÇı0-9\s.,?!'":;()\-@&%]*$/,
                message: "özel karakter giremezsiniz.",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Açıklama"
              value={item.contentDesc}
              name="contentDesc"
              onChange={(e) => handleContentChange(index, e)}
            />
          </Form.Item>

          <Form.Item
            label={`Fiyat ${index + 1}`}
            name={`price3 ${index}`}
            initialValue={item.price}
            rules={[
              { required: true, message: "Lütfen fiyat bilgisini giriniz." },
              {
                pattern: /^[A-Za-zğüişçöĞÜİıŞÇ0-9\s.,?!'":;()\-@&%]*$/,
                message: "özel karakter giremezsiniz.",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="Fiyat"
              value={item.price}
              name="price"
              onChange={(e) => handleContentChange(index, e)}
            />
          </Form.Item>

          <Button type="link" onClick={() => removeContentItem(index)}>
            Kaldır
          </Button>
        </Space>
      ))}

      <Button type="dashed" onClick={addContentItem}>
        Yeni Ürün Ekle
      </Button>
    </div>
  );
};

FormSectionThree.propTypes = {
  contentItemsThree: PropTypes.array,
  setContentItemsThree: PropTypes.func,
};

export default FormSectionThree;
