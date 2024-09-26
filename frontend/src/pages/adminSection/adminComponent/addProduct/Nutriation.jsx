import { Button, Form, Input, Tag } from "antd";
import { NutriationData } from "../../../../constants/data";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
const Nutriation = ({ nutriation, setNutriation }) => {
  const onFinishNutriation = (values) => {
    if (
      values.nutriation &&
      values.nutriationGram &&
      values.nutriationPortion
    ) {
      setNutriation((prevState) => ({
        ...prevState,
        nutriationValue: [
          ...prevState.nutriationValue,
          {
            id: nanoid(),
            nutriation: values.nutriation,
            nutriationPortion: values.nutriationPortion,
            nutriationGram: values.nutriationGram,
          },
        ],
      }));
    }
  };

  const handleDeleteTag = (id) => {
    setNutriation((prevState) => ({
      ...prevState,
      nutriationValue: prevState.nutriationValue.filter(
        (item) => item.id !== id
      ),
    }));
  };

  return (
    <div>
      <Form layout="vertical" onFinish={onFinishNutriation}>
        {NutriationData.map((item) => (
          <div key={item.id} className="flex gap-4">
            {item.fields.map((field) => (
              <Form.Item
                key={nanoid()}
                label={field.label}
                name={field.name}
                rules={field.rules}
              >
                <Input placeholder={field.label} />
              </Form.Item>
            ))}
          </div>
        ))}
        <Button htmlType="submit" type="primary">
          Ekle
        </Button>
      </Form>
      <div className="mt-4">
        {nutriation.nutriationValue.map((item) => (
          <Tag
            key={item.id}
            closable
            onClose={() => handleDeleteTag(item.id)}
            className="mb-2"
          >
            {item.nutriation} - {item.nutriationPortion} - {item.nutriationGram}
          </Tag>
        ))}
      </div>
    </div>
  );
};
Nutriation.propTypes = {
  nutriation: PropTypes.shape({
    nutriationValue: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        nutriation: PropTypes.string.isRequired,
        nutriationPortion: PropTypes.string.isRequired,
        nutriationGram: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setNutriation: PropTypes.func.isRequired,
};
export default Nutriation;
