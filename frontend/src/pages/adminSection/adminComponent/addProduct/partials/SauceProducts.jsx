import { Button, Form, Input, Tag, Typography } from "antd";
import { SauceProducts } from "../../../../../constants/data";
import PropTypes from "prop-types";
const { Text } = Typography;

const SaucesProducts = ({ handleFinish, tags, handleDeleteTag }) => {
  return (
    <div>
      <div className="mb-4">
        <Text strong>Soslar:</Text>
      </div>
      <Form
        layout="vertical"
        onFinish={(values) => handleFinish(values, "sauce")}
      >
        <div className="flex flex-col gap-4 ">
          {SauceProducts.map((item) =>
            item.fields.map((field, index) => (
              <Form.Item
                key={`${field.name}-${index}`}
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                <Input placeholder={field.label} />
              </Form.Item>
            ))
          )}
        </div>
        <Button htmlType="submit" type="primary">
          Ekle
        </Button>
      </Form>
      <div className="mt-4">
        {tags.sauceValue.map((item) => (
          <Tag
            key={item.id}
            closable
            onClose={() => handleDeleteTag(item.id, "sauce")}
            className="mb-2"
          >
            {item.sauce} - {item.saucePrice}
          </Tag>
        ))}
      </div>
    </div>
  );
};
SaucesProducts.propTypes = {
  handleFinish: PropTypes.func.isRequired,
  handleDeleteTag: PropTypes.func.isRequired,
  tags: PropTypes.shape({
    sauceValue: PropTypes.arrayOf(
      PropTypes.shape({
        sauce: PropTypes.string.isRequired,
        saucePrice: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
export default SaucesProducts;
