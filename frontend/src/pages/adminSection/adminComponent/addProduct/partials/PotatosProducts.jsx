import { Button, Form, Input, Tag, Typography } from "antd";
import { PotatoProducts } from "../../../../../constants/data";
import PropTypes from "prop-types";

const { Text } = Typography;

const PotatosProducts = ({
  handleFinish,
  tags,
  handleDeleteTag,
  isLoading,
}) => {
  return (
    <div>
      <div className="mb-4">
        <Text strong>Patates Kızartması:</Text>
      </div>
      <Form
        layout="vertical"
        onFinish={(values) => handleFinish(values, "potato")}
      >
        <div className="flex flex-col gap-4 mb-4">
          {PotatoProducts.map((item) =>
            item.fields.map((field) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                <Input placeholder={field.label} />
              </Form.Item>
            ))
          )}
        </div>
        <Button htmlType="submit" type="primary" disabled={isLoading}>
          {isLoading ? "Loading" : "Ekle"}
        </Button>
      </Form>
      <div className="mt-4">
        {tags.potatoValue.map((item) => (
          <Tag
            key={item.id}
            closable
            onClose={() => handleDeleteTag(item.id, "potato")}
            className="mb-2"
          >
            {item.potato} - {item.potatoPrice}
          </Tag>
        ))}
      </div>
    </div>
  );
};
PotatosProducts.propTypes = {
  handleFinish: PropTypes.func.isRequired,
  handleDeleteTag: PropTypes.func.isRequired,
  tags: PropTypes.shape({
    potatoValue: PropTypes.arrayOf(
      PropTypes.shape({
        potato: PropTypes.string.isRequired,
        potatoPrice: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
};

export default PotatosProducts;
