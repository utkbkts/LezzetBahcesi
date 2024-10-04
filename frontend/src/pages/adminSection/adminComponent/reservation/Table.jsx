import { useState } from "react";
import { Button, Select, Space, Table } from "antd";
import ModalPage from "./Modal";
import { getDateLocal } from "../../../../helpers/helpers";
import PropTypes from "prop-types";
import { useUpdateReservationMutation } from "../../../../redux/api/ReservationApi";

import "react-datepicker/dist/react-datepicker.css";
import {
  CircleArrowOutDownLeft,
  CircleCheckBig,
  CircleX,
  Clock9,
  TableCellsSplit,
} from "lucide-react";
const TableData = ({ getData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateReservation] = useUpdateReservationMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleStatus = (id, newStatus) => {
    updateReservation({ id, body: { status: newStatus } });
  };
  const columns = [
    {
      title: "Saat Aralığı",
      dataIndex: "times",
      key: "times",
      render: (times) => {
        let color;
        if (
          getDateLocal(times).split(" ")[3] >= "06:00:00" &&
          getDateLocal(times).split(" ")[3] <= "11:59:59"
        ) {
          color = "text-green-500"; // Sabah yeşil
        } else if (
          getDateLocal(times).split(" ")[3] >= "12:00:00" &&
          getDateLocal(times).split(" ")[3] <= "15:59:59"
        ) {
          color = "text-red-500"; // Öğle kırmızı
        } else if (
          getDateLocal(times).split(" ")[3] >= "16:00:00" &&
          getDateLocal(times).split(" ")[3] <= "19:59:59"
        ) {
          color = "text-blue-500"; // Akşam mavi
        } else {
          color = "text-yellow-500"; // Gece sarı
        }
        return (
          <span className={color}>
            {" "}
            {times ? getDateLocal(times) : "Çıkış Yapıldı."}
          </span>
        );
      },
      filters: Array.from(
        new Map(
          getData?.reserver?.map((item) => [
            item.times,
            getDateLocal(item.times),
          ])
        ).entries()
        //entries ile arraye çeviriyoruz new Map ile aynı gün aynı saat var ise bir kez gösterilmesini sağladık...
      ).map(([value, text]) => ({
        text,
        value,
      })),
      onFilter: (value, record) => record.times === value,
      ellipsis: true,
    },
    {
      title: "Ad Soyad",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Masa",
      dataIndex: "table",
      key: "table",
      filters: Array.from(
        new Map(
          getData?.reserver?.map((item) => [item.table, item.table])
        ).entries()
      ).map(([value, text]) => ({
        text,
        value,
      })),
      onFilter: (value, record) => record.table === value,
      ellipsis: true,
    },
    {
      title: "Kişi Sayısı",
      dataIndex: "numberOfPeople",
      key: "numberOfPeople",
    },
    {
      title: "Notlar & İstekler",
      dataIndex: "note",
      key: "note",
    },
    {
      title: "Durumu",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let icon;
        switch (status) {
          case "Bekliyor":
            icon = <Clock9 size={20} className="text-gray-400" />;
            break;
          case "Oturuyor":
            icon = <TableCellsSplit size={20} className="text-gray-500" />;
            break;
          case "Onaylı":
            icon = <CircleCheckBig size={20} className="text-gray-500" />;
            break;
          case "İptal":
            icon = <CircleX size={20} className="text-gray-500" />;
            break;
          case "Çıkış Yaptı":
            icon = (
              <CircleArrowOutDownLeft size={20} className="text-gray-500" />
            );
            break;
          default:
            icon = null;
        }

        return <span>{icon}</span>;
      },
    },
    {
      title: "Durum Güncelle",
      dataIndex: "status",
      key: "updateOrderStatus",
      render: (reservationStatus, record) => {
        return (
          <Select
            className="w-full"
            disabled={reservationStatus === "Çıkış Yaptı"}
            defaultValue={record.status}
            onChange={(value) => handleStatus(record._id, value)}
          >
            <Select.Option value="Bekliyor">Bekliyor</Select.Option>
            <Select.Option value="Oturuyor">Oturuyor</Select.Option>
            <Select.Option value="Onaylı">Onaylı</Select.Option>
            <Select.Option value="İptal">İptal</Select.Option>
            <Select.Option value="Çıkış Yaptı">Çıkış Yaptı</Select.Option>
          </Select>
        );
      },
    },
  ];

  const dataSource = getData?.reserver?.map((item) => ({
    ...item,
    key: item._id,
  }));
  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={showModal}>+Rezervasyon Ekle</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
        scroll={{ x: 800 }}
      />
      <ModalPage
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        getData={getData}
      />
    </>
  );
};

TableData.propTypes = {
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
};

export default TableData;
