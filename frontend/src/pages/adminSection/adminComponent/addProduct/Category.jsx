import React from "react";
import { Button, Form, Input, Select, Typography, Tag } from "antd";
import {
  Categoryadd,
  DrinkProducts,
  SideProducts,
  PotatoProducts,
  SauceProducts,
} from "../../../../constants/data";
import { nanoid } from "nanoid";
import PropTypes from "prop-types";
const { Text } = Typography;
const Category = ({ tags, setTags, category, setCategory }) => {
  const handleFinish = (values, type) => {
    if (
      type === "sideProduct" &&
      values.sideProduct &&
      values.sideProductPrice
    ) {
      setTags((prevTags) => ({
        ...prevTags,
        sideProductValue: [
          ...prevTags.sideProductValue,
          {
            id: nanoid(),
            sideProduct: values.sideProduct,
            sideProductPrice: values.sideProductPrice,
          },
        ],
      }));
    }

    if (type === "drinkProduct" && values.drinks && values.drinksPrice) {
      setTags((prevTags) => ({
        ...prevTags,
        drinksValue: [
          ...prevTags.drinksValue,
          {
            id: nanoid(),
            drinkProduct: values.drinks,
            drinkProductPrice: values.drinksPrice,
          },
        ],
      }));
    }

    if (type === "potato" && values.potato && values.potatoPrice) {
      setTags((prevTags) => ({
        ...prevTags,
        potatoValue: [
          ...prevTags.potatoValue,
          {
            id: nanoid(),
            potato: values.potato,
            potatoPrice: values.potatoPrice,
          },
        ],
      }));
    }

    if (type === "sauce" && values.sauce && values.saucePrice) {
      setTags((prevTags) => ({
        ...prevTags,
        sauceValue: [
          ...prevTags.sauceValue,
          {
            id: nanoid(),
            sauce: values.sauce,
            saucePrice: values.saucePrice,
          },
        ],
      }));
    }
  };

  const handleDeleteTag = (index, type) => {
    if (type === "sideProduct") {
      tags.sideProductValue.filter((item) => item !== index);
    }
    if (type === "drinkProduct") {
      tags.drinksValue.filter((item) => item !== index);
    }
    if (type === "potato") {
      tags.potatoValue.filter((item) => item !== index);
    }
    if (type === "sauce") {
      tags.sauceValue.filter((item) => item !== index);
    }
    setTags((prevState) => ({
      ...prevState,
      sideProductValue: [...prevState.sideProductValue],
      drinksValue: [...prevState.drinksValue],
      potatoValue: [...prevState.potatoValue],
      sauceValue: [...prevState.sauceValue],
    }));
  };

  return (
    <div className="w-full">
      <Select
        value={category || "kategori seçiniz"}
        onChange={(value) => setCategory(value)}
        className="w-full mb-4"
      >
        {Categoryadd.map((item) => (
          <Select.Option key={item.id} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        {/* Yan Ürünler */}
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
                item.fields.map((field) => (
                  <Form.Item
                    key={nanoid()}
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

        {/* İçecek Seçimi */}
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
                    key={nanoid()}
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

        {/* Patates Kızartması */}
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
                    key={nanoid()}
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

        {/* Soslar */}
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
                item.fields.map((field) => (
                  <Form.Item
                    key={nanoid()}
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
      </div>
    </div>
  );
};
Category.propTypes = {
  tags: PropTypes.shape({
    sideProductValue: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        sideProduct: PropTypes.string.isRequired,
        sideProductPrice: PropTypes.number.isRequired,
      })
    ).isRequired,
    drinksValue: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        drinkProduct: PropTypes.string.isRequired,
        drinkProductPrice: PropTypes.number.isRequired,
      })
    ).isRequired,
    potatoValue: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        potato: PropTypes.string.isRequired,
        potatoPrice: PropTypes.number.isRequired,
      })
    ).isRequired,
    sauceValue: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        sauce: PropTypes.string.isRequired,
        saucePrice: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  setTags: PropTypes.func.isRequired,
  category: PropTypes.string,
  setCategory: PropTypes.func.isRequired,
};
export default Category;
