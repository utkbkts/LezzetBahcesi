import { Button, Form, Input, Tag, Typography } from "antd";
import { SideProducts } from "../../../../../constants/data";
import PropTypes from "prop-types";

const { Text } = Typography;

const SideProduct = ({ handleFinish, tags, handleDeleteTag, isLoading }) => {
  return (
    <div>
      <div className="mb-4">
        <Text strong>Yan Ürünler:</Text>
      </div>
      <Form
        layout="vertical"
        onFinish={(values) => handleFinish(values, "sideProduct")}
      >
        <div className="flex gap-4 mb-4">
          {SideProducts.map((item) =>
            item.fields.map((field, index) => (
              <Form.Item
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                <Input placeholder={field.label} disabled={isLoading} />
              </Form.Item>
            ))
          )}
        </div>
        <Button htmlType="submit" type="primary" disabled={isLoading}>
          {isLoading ? "Yükleniyor" : "Ekle"}
        </Button>
      </Form>
      <div className="mt-4">
        {tags.sideProductValue.map((item) => (
          <Tag
            key={item.id}
            closable
            onClose={() => handleDeleteTag(item.id, "sideProduct")}
            className="mb-2"
          >
            {item.sideProduct} - {item.sideProductPrice}
          </Tag>
        ))}
      </div>
    </div>
  );
};
SideProduct.propTypes = {
  handleFinish: PropTypes.func.isRequired,
  handleDeleteTag: PropTypes.func.isRequired,
  tags: PropTypes.shape({
    sideProductValue: PropTypes.arrayOf(
      PropTypes.shape({
        sideProduct: PropTypes.string.isRequired,
        sideProductPrice: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
};
export default SideProduct;
