import { useState } from "react";
import {
  Button,
  Select,
  Space,
  Table,
  Modal,
  Form,
  Input,
  Row,
  Col,
} from "antd";
import DatePicker from "react-datepicker";
import { tr } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

const data = [
  {
    key: "1",
    time: [
      {
        id: 1,
        timeS: "23:00-24:00",
        day: "eylül,12.24.2025",
      },
    ],
    name: "Jim",
    table: "M145",
    age: 32,
    address: "New York No. 1 Lake Park",
    numberOfPeople: "4",
    note: "hazır olsun",
    status: "oturuyor",
  },
  {
    key: "2",
    time: [
      {
        id: 1,
        timeS: "23:00-24:00",
        day: "eylül,12.24.2025",
      },
    ],
    name: "Jim",
    table: "M145",
    age: 42,
    address: "London No. 1 Lake Park",
    numberOfPeople: "3",
    note: "tamam",
    status: "iptal",
  },
  {
    key: "3",
    name: "Jim",
    time: [
      {
        id: 1,
        timeS: "23:00-24:00",
        day: "eylül,12.24.2025",
      },
    ],
    table: "M145",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    numberOfPeople: "4",
    note: "hazır olsun",
    status: "çıkış yaptı",
  },
  {
    key: "4",
    table: "M145",
    name: "Jim",
    time: [
      {
        id: 1,
        timeS: "23:00-24:00",
        day: "eylül,12.24.2025",
      },
    ],
    age: 32,
    address: "London No. 2 Lake Park",
    numberOfPeople: "2",
    note: "tamam",
    status: "onaylı",
  },
  {
    key: "5",
    table: "M146",
    name: "Jim",
    time: [
      {
        id: 1,
        timeS: "23:00-24:00",
        day: "eylül,12.24.2025",
      },
    ],
    age: 32,
    address: "London No. 3 Lake Park",
    numberOfPeople: "6",
    note: "hazır olsun",
    status: "devam ediyor",
  },
];

const TableData = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const tableInput = Array.from({ length: 150 }, (_, index) => ({
    id: index + 1,
    table: `M${index + 1}`,
  }));
  const tableInputPeople = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    people: `${index + 1 === 4 ? "4+" : index + 1}`,
  }));

  const onFinish = (values) => {
    console.log(values);
  };
  const columns = [
    {
      title: "Saat Aralığı",
      dataIndex: "time",
      key: "time",
      render: (time) => {
        return time.map((item) => (
          <div key={item.id}>
            {item.timeS}-{item.day}
          </div>
        ));
      },
    },
    {
      title: "Ad Soyad",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Masa",
      dataIndex: "table",
      key: "table",
      filters: [
        { text: "M145", value: "M145" },
        { text: "M140", value: "M140" },
      ],
      filteredValue: filteredInfo.table || null,
      onFilter: (value, record) => record.table.includes(value),
      sorter: (a, b) => a.table.localeCompare(b.table),
      sortOrder: sortedInfo.columnKey === "table" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Kişi Sayısı",
      dataIndex: "numberOfPeople",
      key: "numberOfPeople",
      filters: [
        { text: "4", value: "4" },
        { text: "3", value: "3" },
        { text: "6 ", value: " 6" },
        { text: "2", value: "2" },
        { text: " 1", value: " 1" },
      ],
      filteredValue: filteredInfo.numberOfPeople || null,
      onFilter: (value, record) => record.numberOfPeople.includes(value),
      sorter: (a, b) => a.numberOfPeople.length - b.numberOfPeople.length,
      sortOrder:
        sortedInfo.columnKey === "numberOfPeople" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Notlar & İstekler",
      dataIndex: "note",
      key: "note",
      filters: [
        { text: "hazır olsun", value: "hazır olsun" },
        { text: "tamam", value: "tamam" },
      ],
      filteredValue: filteredInfo.note || null,
      onFilter: (value, record) => record.note.includes(value),
      sorter: (a, b) => a.note.length - b.note.length,
      sortOrder: sortedInfo.columnKey === "note" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Durumu",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "oturuyor", value: "oturuyor" },
        { text: "iptal", value: "iptal" },
        { text: "çıkış yaptı", value: "çıkış yaptı" },
        { text: "onaylı", value: "onaylı" },
        { text: "devam ediyor", value: "devam ediyor" },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      ellipsis: true,
    },
    {
      title: "Durum Güncelle",
      dataIndex: "reservationStatus",
      key: "updateOrderStatus",
      render: (reservationStatus, record) => (
        <Select
          className="w-full"
          disabled={reservationStatus === "çıkış yaptı"}
          defaultValue={record.status}
        >
          <Select.Option value="iptal">İptal</Select.Option>
          <Select.Option value="oturuyor">Oturuyor</Select.Option>
          <Select.Option value="onaylı">Onaylı</Select.Option>
          <Select.Option value="çıkış yaptı">çıkış yaptı</Select.Option>
          <Select.Option value="bekliyor">Bekliyor</Select.Option>
          <Select.Option value="devam ediyor">Devam ediyor</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearAll}>Tüm Filteleri temizle</Button>
        <Button onClick={showModal}>+Rezervasyon Ekle</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
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
                <Col span={12}>
                  <Form.Item
                    label="İsim"
                    name="name"
                    rules={[
                      { required: true, message: "Lütfen isim giriniz." },
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
                    label="Soyadı"
                    name="lastname"
                    rules={[
                      { required: true, message: "Lütfen soyadı giriniz." },
                      {
                        pattern: /^[a-z ,.şğıiüç'-]+$/i,
                        message: "Özel karakter kullanamazsınız.",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="times"
                label="Tarih Giriniz."
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Lütfen tarih giriniz!",
                  },
                ]}
              >
                <DatePicker
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 cursor-pointer text-gray-600"
                  timeCaption="Saat"
                  dateFormat="Pp"
                  locale={tr}
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                />
              </Form.Item>
              <Form.Item
                name="table"
                label="Masa Numarası giriniz."
                rules={[
                  { required: true, message: "Lütfen masa numarası seçiniz!" },
                ]}
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
                name="numberOfPeople"
                label="Kişi Sayısı"
                rules={[
                  { required: true, message: "Lütfen kişi sayısı giriniz" },
                ]}
              >
                <Select placeholder="Kişi sayısını giriniz">
                  {tableInputPeople.map((item) => (
                    <Select.Option key={item.id} value={item.people}>
                      {item.people}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Özel istek"
                name="note"
                rules={[
                  {
                    pattern: /^[a-z ,.şğıiüç'-]+$/i,
                    message: "Özel karakter kullanamazsınız.",
                  },
                ]}
              >
                <Input placeholder="özel isteğinizi giriniz" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" className="w-full" htmlType="submit">
                  Kaydet
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TableData;
