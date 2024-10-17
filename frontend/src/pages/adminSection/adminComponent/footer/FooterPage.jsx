import { Button, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import FormWorking from "./partials/FormWorking";
import FooterContact from "./partials/FormsContact";
import toast from "react-hot-toast";
import FormsSocialMedia from "./partials/FormsSocialMedia";
import {
  useCreateFooterMutation,
  useGetFooterQuery,
} from "../../../../redux/api/FooterApi";

const FooterPage = () => {
  const [dayHourValues, setDayHourValues] = useState({
    dayhourValue: [],
  });
  const [form] = useForm();
  const [createFooter] = useCreateFooterMutation();
  const { data: footerGetData } = useGetFooterQuery();

  useEffect(() => {
    if (footerGetData) {
      form.setFieldsValue({
        address: footerGetData.footer[0].contact.address,
        email: footerGetData.footer[0].contact.email,
        phone: footerGetData.footer[0].contact.phone,
        facebook: footerGetData.footer[0].socialMedia.facebook,
        twitter: footerGetData.footer[0].socialMedia.twitter,
        linkedin: footerGetData.footer[0].socialMedia.linkedin,
        instagram: footerGetData.footer[0].socialMedia.instagram,
      });
      const workingHours = footerGetData.footer[0].workingHours.map((item) => ({
        dayRange: item.day,
        hourRange: item.hours,
      }));
      setDayHourValues({ dayhourValue: workingHours });
    }
  }, []);
  const onFinish = (values) => {
    if (dayHourValues.dayhourValue.length > 2) {
      return toast.error("en fazla 2 tag eklenebilir.");
    }
    const dataSend = {
      contact: {
        address: values.address,
        email: values.email,
        phone: values.phone,
      },
      workingHours: dayHourValues.dayhourValue.map((item) => ({
        day: item.dayRange,
        hours: item.hourRange,
      })),
      socialMedia: {
        facebook: values.facebook,
        twitter: values.twitter,
        instagram: values.instagram,
        linkedin: values.linkedin,
      },
    };

    createFooter(dataSend);
    toast.success("Başarıyla Güncellendi.");
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        {/* address information */}
        <FooterContact />
        {/* working hours */}
        <div className="mb-12">
          <FormWorking
            dayHourValues={dayHourValues}
            form={form}
            setDayHourValues={setDayHourValues}
          />
        </div>
        {/* social media  */}
        <div>
          <FormsSocialMedia />
        </div>

        <Button htmlType="submit" type="primary">
          Güncelle
        </Button>
      </Form>
    </div>
  );
};

export default FooterPage;
