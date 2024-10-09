import { Button, Form, Input, Typography } from "antd";
import Category from "./Category";
import { addProductTitle } from "../../../../constants/data";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import UploadImages from "./UploadImages";
import Nutriation from "./Nutriation";
import { useCreateProductsMutation } from "../../../../redux/api/ProductApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const AddProduct = () => {
  const [tags, setTags] = useState({
    sideProductValue: [],
    drinksValue: [],
    potatoValue: [],
    sauceValue: [],
  });
  const [nutriation, setNutriation] = useState({
    nutriationValue: [],
  });
  const [createProduct, { isSuccess, error, isLoading }] =
    useCreateProductsMutation();
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Ürün başarıyla eklendi");
      navigate("/admin/products");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error, isSuccess]);

  const onFinish = (values) => {
    const dataAll = {
      productDetail: values,
      category: category,
      tags,
      nutriation,
      images,
    };
    createProduct(dataAll);
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Ürün Ekle</h1>
      <div>
        <Category
          category={category}
          setCategory={setCategory}
          tags={tags}
          setTags={setTags}
          isLoading={isLoading}
        />
      </div>
      <div>
        <div className="mt-4">
          <Title>Ürün resmi yükle.</Title>
          <UploadImages images={images} setImages={setImages} />
        </div>
        <div className="mt-4">
          <Title>Ürünün Besin İçerik bilgileri.</Title>
          <Nutriation
            nutriation={nutriation}
            setNutriation={setNutriation}
            isLoading={isLoading}
          />
        </div>
        <Title>Ürün Detayları</Title>
        <Form onFinish={onFinish} layout="vertical">
          {addProductTitle.map((item) => {
            return item.type === "textarea" ? (
              <Form.Item
                key={item.id}
                label={item.placeholder}
                name={item.name}
                rules={item.rules}
              >
                <TextArea placeholder={item.placeholder} disabled={isLoading} />
              </Form.Item>
            ) : (
              <Form.Item
                key={item.id}
                label={item.placeholder}
                name={item.name}
                rules={item.rules}
              >
                <Input placeholder={item.placeholder} disabled={isLoading} />
              </Form.Item>
            );
          })}

          <Button disabled={isLoading} htmlType="submit" type="primary">
            {isLoading ? "yükleniyor" : "Kaydet"}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
