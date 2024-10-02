import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
import { useSaveReservationMutation } from "../../../../redux/api/ReservationApi";
import toast from "react-hot-toast";
import { tr } from "date-fns/locale";

const ModalPage = ({ setIsModalOpen, isModalOpen, getData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [createReservation, { error, isSuccess, isError }] =
    useSaveReservationMutation();
  const [form] = Form.useForm();
  useEffect(() => {
    if (isError) {
      console.log(error);
      toast.error(error.message);
    }
    if (isSuccess) {
      toast.success("Başarılı bir şekilde rezervasyon kaydedildi");
      setIsModalOpen(false);
      form.resetFields();
    }
  }, [isSuccess, error, isError]);
  const tableInput = Array.from({ length: 150 }, (_, index) => ({
    id: index + 1,
    table: `M${index + 1}`,
  }));
  const tableInputPeople = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    people: `${index + 1 === 4 ? "4+" : index + 1}`,
  }));

  const reservedDates =
    getData?.reserver?.map((reservation) => new Date(reservation.times)) || [];

  const filteredTime = (time) => {
    if (!selectedDate) return;

    const selectedDateWithTime = new Date(selectedDate);
    selectedDateWithTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

    return !reservedDates.some((item) => {
      const reservedDateWithTime = new Date(item);
      return (
        reservedDateWithTime.toDateString() ===
          selectedDateWithTime.toDateString() &&
        reservedDateWithTime.getHours() === time.getHours() &&
        reservedDateWithTime.getMinutes() === time.getMinutes()
      );
    });
  };

  const formItems = [
    {
      label: "İsim",
      name: "name",
      rules: [
        { required: true, message: "Lütfen isim giriniz." },
        {
          pattern: /^[a-zA-ZÇĞİÖŞÜçğİöşü0-9\s,.'-]+$/,
          message: "Özel karakter kullanamazsınız.",
        },
      ],
      component: <Input />,
    },
    {
      label: "Soyadı",
      name: "lastname",
      rules: [
        { required: true, message: "Lütfen soyadı giriniz." },
        {
          pattern: /^[a-zA-ZÇĞİÖŞÜçğİöşü0-9\s,.'-]+$/,
          message: "Özel karakter kullanamazsınız.",
        },
      ],
      component: <Input />,
    },
    {
      label: "Tarih Giriniz.",
      name: "times",
      rules: [{ required: true, message: "Lütfen tarih giriniz!" }],
      component: (
        <DatePicker
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={60}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 cursor-pointer text-gray-600"
          timeCaption="Saat"
          dateFormat="Pp"
          locale={tr}
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          filterTime={(time) => filteredTime(time)}
        />
      ),
    },
    {
      label: "Masa Numarası giriniz.",
      name: "table",
      rules: [{ required: true, message: "Lütfen masa numarası seçiniz!" }],
      component: (
        <Select placeholder="Masa seçin">
          {tableInput.map((item) => (
            <Select.Option key={item.id} value={item.table}>
              {item.table}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: "Kişi Sayısı",
      name: "numberOfPeople",
      rules: [{ required: true, message: "Lütfen kişi sayısı giriniz" }],
      component: (
        <Select placeholder="Kişi sayısını giriniz">
          {tableInputPeople.map((item) => (
            <Select.Option key={item.id} value={item.people}>
              {item.people}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      label: "Özel istek",
      name: "note",
      rules: [
        {
          pattern: /^[a-zA-ZÇĞİÖŞÜçğİöşü ,.'-]+$/,
          message: "Özel karakter kullanamazsınız.",
        },
      ],
      component: <Input placeholder="özel isteğinizi giriniz" />,
    },
  ];

  const onFinish = (values) => {
    console.log(values);
    createReservation(values);
  };
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      <div>
        <h3 className="text-center text-black ">Rezervasyon</h3>
        <div>
          <Form onFinish={onFinish} layout="vertical">
            <Row gutter={16}>
              {formItems.map((item) => (
                <Col span={12} key={item.name}>
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    rules={item.rules}
                  >
                    {item.component}
                  </Form.Item>
                </Col>
              ))}
            </Row>
            <Button type="primary" htmlType="submit" className="w-full">
              Ekle
            </Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
ModalPage.propTypes = {
  getData: PropTypes.shape({
    reserver: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        times: PropTypes.string.isRequired,
        numberOfPeople: PropTypes.number.isRequired,
        table: PropTypes.string.isRequired,
        note: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
      })
    ),
  }),
  isModalOpen: PropTypes.string,
  setIsModalOpen: PropTypes.func,
};

export default ModalPage;
