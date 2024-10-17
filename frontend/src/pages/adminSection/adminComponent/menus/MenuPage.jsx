import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import FormSectionOne from "./partials/FormSectionOne";
import FormSectionTwo from "./partials/FormSectionTwo";
import FormSectionThree from "./partials/FormSectionThree";
import { useEffect, useState } from "react";
import {
  useCreateMenuMutation,
  useGetMenuQuery,
} from "../../../../redux/api/MenuApi";
import toast from "react-hot-toast";

const MenuPage = () => {
  const [form] = useForm();
  const [createMenu] = useCreateMenuMutation();
  const { data } = useGetMenuQuery();

  const [contentItems, setContentItems] = useState([]);
  const [contentItemsTwo, setContentItemsTwo] = useState([]);
  const [contentItemsThree, setContentItemsThree] = useState([]);
  useEffect(() => {
    if (data) {
      // Formu doldur
      form.setFieldsValue({
        titleOne: data.menu[0]?.titleOne || "",
        titleTwo: data.menu[0]?.titleTwo || "",
        titleThree: data.menu[0]?.titleThree || "",
      });

      const contentDataOne = data.menu[0]?.contentOne || [];
      const contentDataTwo = data.menu[0]?.contentTwo || [];
      const contentDataThree = data.menu[0]?.contentThree || [];

      setContentItems(contentDataOne);
      setContentItemsTwo(contentDataTwo);
      setContentItemsThree(contentDataThree);
    }
  }, [data, form]);

  const onFinish = (values) => {
    const menuData = {
      titleOne: values.titleOne,
      contentOne: contentItems.map((item) => ({
        contentTitle: item.contentTitle,
        contentDesc: item.contentDesc,
        price: item.price,
      })),
      titleTwo: values.titleTwo,
      contentTwo: contentItemsTwo.map((item) => ({
        contentTitle: item.contentTitle,
        contentDesc: item.contentDesc,
        price: item.price,
      })),
      titleThree: values.titleThree,
      contentThree: contentItemsThree.map((item) => ({
        contentTitle: item.contentTitle,
        contentDesc: item.contentDesc,
        price: item.price,
      })),
    };
    createMenu(menuData);
    toast.success("başarıyla güncellendi");
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <div>
          <FormSectionOne
            contentItems={contentItems}
            setContentItems={setContentItems}
          />
        </div>
        <div className="">
          <FormSectionTwo
            contentItemsTwo={contentItemsTwo}
            setContentItemsTwo={setContentItemsTwo}
          />
        </div>
        <div>
          <FormSectionThree
            contentItemsThree={contentItemsThree}
            setContentItemsThree={setContentItemsThree}
          />
        </div>
        <Button htmlType="submit" type="primary" className="mt-8">
          Güncelle
        </Button>
      </Form>
    </div>
  );
};

export default MenuPage;
