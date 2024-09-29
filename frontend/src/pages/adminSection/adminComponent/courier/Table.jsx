import { Button, Table } from "antd";

const data = [
  {
    id: 1,
    name: "ömer",
    phoneNumber: "454545",
    statu: "bekliyor",
    dateWork: "30.09.2024",
    order: 2,
  },
  {
    id: 2,
    name: "ali",
    phoneNumber: "45454542",
    statu: "yolda",
    dateWork: "01.09.2024",
    order: 4,
  },
];

const TableData = () => {
  const handleRemove = (id) => {
    if (window.confirm("Bu kişiyi silmek istediğine emin misin?")) {
      console.log(id);
    }
  };
  const columns = [
    {
      title: "Ad ve Soyad",
      dataIndex: "name",
      render: (text) => text,
    },
    {
      title: "Telefon Numarası",
      dataIndex: "phoneNumber",
      render: (text) => text,
    },
    {
      title: "Statü",
      dataIndex: "statu",
      render: (text) => text,
    },
    {
      title: "Götürdüğü Sipariş Sayısı",
      dataIndex: "order",
      render: (text) => text,
    },
    {
      title: "İşe Giriş Tarihi",
      dataIndex: "dateWork",
      render: (text) => text,
    },
    {
      title: "Eylemler",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleRemove(record.id)}>
          Çıkış
        </Button>
      ),
    },
  ];
  return (
    <div className="min-h-screen">
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default TableData;
