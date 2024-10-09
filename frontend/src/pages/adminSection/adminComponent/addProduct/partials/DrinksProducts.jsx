import { Button, Form, Input, Tag, Typography } from "antd";
import { DrinkProducts } from "../../../../../constants/data";
import PropTypes from "prop-types";

const { Text } = Typography;

const DrinksProducts = ({ handleFinish, tags, handleDeleteTag, isLoading }) => {
  return (
    <div>
      <div className="mb-4">
        <Text strong>İçecek Seçimi:</Text>
      </div>
      <Form
        layout="vertical"
        onFinish={(values) => handleFinish(values, "drinkProduct")}
      >
        <div className="flex gap-4 mb-4">
          {DrinkProducts.map((item) =>
            item.fields.map((field) => (
              <Form.Item
                key={field.name}
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
          {isLoading ? "Loading" : "Ekle"}
        </Button>
      </Form>
      <div className="mt-4">
        {tags.drinksValue.map((item) => (
          <Tag
            key={item.id}
            closable
            onClose={() => handleDeleteTag(item.id, "drinkProduct")}
            className="mb-2"
          >
            {item.drinkProduct} - {item.drinkProductPrice}
          </Tag>
        ))}
      </div>
    </div>
  );
};
DrinksProducts.propTypes = {
  handleFinish: PropTypes.func.isRequired,
  handleDeleteTag: PropTypes.func.isRequired,
  tags: PropTypes.shape({
    drinksValue: PropTypes.arrayOf(
      PropTypes.shape({
        drinkProduct: PropTypes.string.isRequired,
        drinkProductPrice: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
export default DrinksProducts;
