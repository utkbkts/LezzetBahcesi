import { useEffect, useState } from "react";
import videoimg from "/hero/video.jpg";
import { Button, Col, Form, Input, Row, Select } from "antd";
import DatePicker from "react-datepicker";
import { tr } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import TextArea from "antd/es/input/TextArea";
import {
  useGetReservationQuery,
  useSaveReservationMutation,
} from "../../redux/api/ReservationApi";
import toast from "react-hot-toast";

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [createReservation, { error, isSuccess, isError }] =
    useSaveReservationMutation();
  const { data: getData } = useGetReservationQuery();
  const reservedDates =
    getData?.reserver?.map((reservation) => new Date(reservation.times)) || [];

  const reservedTimes = reservedDates.map((date) => date.getHours());
  const isTimeDisabled = (time) => {
    const selectedHour = time.getHours();
    const selectedDate = time.getDate();
    const selectedMonth = time.getMonth();
    const selectedYear = time.getFullYear();

    return reservedDates.some((reservedDate) => {
      return (
        reservedDate.getDate() === selectedDate &&
        reservedDate.getMonth() === selectedMonth &&
        reservedDate.getFullYear() === selectedYear &&
        reservedTimes.includes(selectedHour)
      );
    });
  };
  const [form] = Form.useForm();
  const tableInput = Array.from({ length: 150 }, (_, index) => ({
    id: index + 1,
    table: `M${index + 1}`,
  }));
  useEffect(() => {
    if (isError) {
      toast.error(error.data.message);
    }
    if (isSuccess) {
      toast.success("Başarılı bir şekilde rezervasyon kaydedildi");
      form.resetFields();
      setSelectedDate(null);
    }
  }, [isSuccess, error, isError]);
  const onFinish = (values) => {
    createReservation({
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      times: selectedDate,
      table: values.table,
      numberOfPeople: values.people,
      note: values.special,
    });
  };
  return (
    <div className="container mx-auto min-h-screen">
      <div className="xl:flex justify-center mt-24 xl:mt-0">
        <img src={videoimg} alt="" className="object-cover xl:block hidden" />
        <div className=" bg-[#0F172B] py-8 px-6 w-full">
          <div className="relative">
            <span className="text-orange-400">Rezervasyon</span>
            <span className="absolute inset-y-0 top-1/2 bg-orange-400 w-32 ml-2 h-[1px]"></span>
          </div>
          <div>
            <h4 className="text-white font-[800] pt-4">
              Online masa rezervasyonu yapın.
            </h4>
            <Form
              form={form}
              className="p-8 w-full"
              onFinish={onFinish}
              layout="vertical"
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label={<span className="text-white">{"isim"}</span>}
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen isminizi  giriniz.",
                      },
                      {
                        pattern: /^[a-z ,.şğıiüç'-]+$/i,
                        message: "Özel karakter kullanamazsınız.",
                      },
                    ]}
                  >
                    <Input placeholder="isim" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label={<span className="text-white">{"soy isim"}</span>}
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen soy isminizi giriniz.",
                      },
                      {
                        pattern: /^[a-z ,.şğıiüç'-]+$/i,
                        message: "Özel karakter kullanamazsınız.",
                      },
                    ]}
                  >
                    <Input placeholder="soyisim" />
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
                    <Input placeholder="email" />
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
                <Select placeholder="kişi sayısı">
                  <Select.Option value="1">1</Select.Option>
                  <Select.Option value="2">2</Select.Option>
                  <Select.Option value="3">3</Select.Option>
                  <Select.Option value="4+">4+</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                name={"selectedDate"}
                label={<span className="text-white">{"Tarih ve zaman"}</span>}
                rules={[
                  { required: true, message: "Lütfen tarihi belirtiniz." },
                ]}
              >
                <DatePicker
                  placeholderText="tarihi seçiniz"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 cursor-pointer text-gray-600"
                  timeCaption="Saat"
                  dateFormat="Pp"
                  locale={tr}
                  filterTime={(time) => !isTimeDisabled(time)}
                />
              </Form.Item>
              <Form.Item
                name={"table"}
                label={<span className="text-white">{"Masa seçiniz"}</span>}
                rules={[{ required: true, message: "Lütfen masa belirtiniz." }]}
              >
                <Select placeholder="Masa seçin">
                  {tableInput.map((item) => (
                    <Select.Option key={item.id} value={item.table}>
                      {item.table}
                    </Select.Option>
                  ))}
                </Select>
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
