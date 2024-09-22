import React, { useState } from "react";
import videoimg from "/hero/video.jpg";
import { Button, Col, Form, Input, Row, Select } from "antd";
import DatePicker from "react-datepicker";
import { tr } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import TextArea from "antd/es/input/TextArea";

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex justify-center">
        <img src={videoimg} alt="" className="object-cover" />
        <div className=" bg-[#0F172B] py-8 px-6 w-full">
          <div className="relative">
            <span className="text-orange-400">Rezervasyon</span>
            <span className="absolute inset-y-0 top-1/2 bg-orange-400 w-32 ml-2 h-[1px]"></span>
          </div>
          <div>
            <h4 className="text-white font-[800] pt-4">
              Online masa rezervasyonu yapın.
            </h4>
            <Form className="p-8 w-full" onFinish={onFinish} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={
                      <span className="text-white">{"isim ve soy isim"}</span>
                    }
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen isminizi ve soy isminizi giriniz.",
                      },
                      {
                        pattern: /^[a-z ,.şğıiüç'-]+$/i,
                        message: "Özel karakter kullanamazsınız.",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<span className="text-white">{"Email"}</span>}
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen email adresinizi giriniz.",
                      },
                      {
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
                        message: "Geçerli bir email adresi giriniz.",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label={<span className="text-white">{"Kişi sayısı"}</span>}
                name="people"
                rules={[
                  {
                    required: true,
                    message: "Lütfen kişi sayısınızı belirtiniz.",
                  },
                ]}
              >
                <Select onChange={""}>
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                  <Select.Option value="4+">4+</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="text-white">{"Tarih ve zaman"}</span>}
                rules={[
                  { required: true, message: "Lütfen tarihi belirtiniz." },
                ]}
              >
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 cursor-pointer text-gray-600"
                  timeCaption="Saat"
                  dateFormat="Pp"
                  locale={tr}
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-white">{"Özel istek"}</span>}
                name="special"
                rules={[
                  {
                    pattern: /^[a-z ,.şğıiüç'-]+$/i,
                    message: "Özel karakter kullanamazsınız.",
                  },
                ]}
              >
                <TextArea rows={4} className="" />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Rezervasyon Yap
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
