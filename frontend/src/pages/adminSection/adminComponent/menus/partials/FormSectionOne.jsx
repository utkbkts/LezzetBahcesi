import { Form, Input, Button, Space } from "antd";
import toast from "react-hot-toast";

const FormSectionOne = ({ contentItems, setContentItems }) => {
  const handleContentChange = (index, event) => {
    const { name, value } = event.target;
    const newContentItems = [...contentItems];
    newContentItems[index][name] = value;
    setContentItems(newContentItems);
  };

  const addContentItem = () => {
    if (contentItems.length >= 4) {
      return toast.error("En fazla 4 detay girebilirsiniz.");
    }
    setContentItems([
      ...contentItems,
      { contentTitle: "", contentDesc: "", price: "" },
    ]);
  };

  const removeContentItem = (index) => {
    const newContentItems = contentItems.filter((_, i) => i !== index);
    setContentItems(newContentItems);
  };

  return (
    <div>
      <h1>1. Alan</h1>
      <Form.Item
        label="Ana Başlık"
        name="titleOne"
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

      {contentItems.map((item, index) => (
        <Space
          key={index}
          style={{ display: "flex", marginBottom: 8 }}
          align="baseline"
        >
          <Form.Item
            label={`Ürün Başlığı ${index + 1}`}
            name={`contentTitle${index}`}
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
              value={item.contentTitle}
              name="contentTitle"
              onChange={(e) => handleContentChange(index, e)}
            />
          </Form.Item>

          <Form.Item
            label={`Açıklama ${index + 1}`}
            name={`contentDesc${index}`}
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
            name={`price${index}`}
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

export default FormSectionOne;
