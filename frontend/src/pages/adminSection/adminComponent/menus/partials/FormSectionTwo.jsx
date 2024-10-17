import { Form, Input, Button, Space } from "antd";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
const FormSectionOne = ({ contentItemsTwo, setContentItemsTwo }) => {
  const handleContentChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = contentItemsTwo.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setContentItemsTwo(newItems);
  };

  const addContentItem = () => {
    if (contentItemsTwo.length > 4) {
      return toast.success("en fazla 4 detay ekleyebilirsiniz.");
    }
    setContentItemsTwo([
      ...contentItemsTwo,
      { contentTitle: "", contentDesc: "", price: "" },
    ]);
  };

  const removeContentItem = (index) => {
    const filter = contentItemsTwo.filter((_, i) => i !== index);
    setContentItemsTwo(filter);
  };
  return (
    <div>
      <h1>2. Alan</h1>
      <Form.Item
        label="Ana Başlık"
        name="titleTwo"
        rules={[
          { required: true, message: "Lütfen ana başlık bilgisini giriniz." },
          {
            pattern: /^[A-Za-zğüişçöĞÜİŞÇı0-9\s.,?!'":;()\-@&%]*$/,
            message: "Özel karakter giremezsiniz.",
          },
        ]}
      >
        <Input type="text" placeholder="Birinci bölüm başlık" />
      </Form.Item>

      {contentItemsTwo.map((item, index) => (
        <Space
          key={index}
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item
            label={`Ürün Başlığı ${index + 1}`}
            name={`contentTitle2 ${index}`}
            initialValue={item.contentTitle}
            rules={[
              {
                required: true,
                message: "Lütfen ürün başlık bilgisini giriniz.",
              },
              {
                pattern: /^[A-Za-zğüişçöĞÜİŞıÇ0-9\s.,?!'":;()\-@&%]*$/,
                message: "Özel karakter giremezsiniz.",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Ürün başlığı"
              name="contentTitle"
              onChange={(e) => handleContentChange(index, e)}
            />
          </Form.Item>

          <Form.Item
            label={`Açıklama ${index + 1}`}
            name={`contentDesc2 ${index}`}
            initialValue={item.contentDesc}
            rules={[
              {
                required: true,
                message: "Lütfen açıklama bilgisini giriniz.",
              },
              {
                pattern: /^[A-Za-zğüişçöĞÜİıŞÇ0-9\s.,?!'":;()\-@&%]*$/,
                message: "Özel karakter giremezsiniz.",
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
            name={`price2 ${index}`}
            initialValue={item.price}
            rules={[
              { required: true, message: "Lütfen fiyat bilgisini giriniz." },
              {
                pattern: /^[A-Za-zğüişçöĞÜİıŞÇ0-9\s.,?!'":;()\-@&%]*$/,
                message: "Özel karakter giremezsiniz.",
              },
            ]}
          >
            <Input
              type="text"
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

FormSectionOne.propTypes = {
  contentItemsTwo: PropTypes.array,
  setContentItemsTwo: PropTypes.func,
};
export default FormSectionOne;
