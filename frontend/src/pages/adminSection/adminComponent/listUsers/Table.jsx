import { Table } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import createUser from "/create-user.png";
import removeUser from "/remove-user.png";
import userLock from "/user-lock.png";
import PropTypes from "prop-types";
import { useState } from "react";
const TableData = ({ roleAdmin, blockedUser, data }) => {
  const { user } = useSelector((state) => state.auth);
  const [tooltipsVisible, setTooltipsVisible] = useState({
    createUser: false,
    userLock: false,
  });
  const [tooltipContent, setTooltipContent] = useState("");

  const handleBlockedUser = (id) => {
    blockedUser(id);
  };

  const handleUserRoleChange = (id, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user";
    roleAdmin({ id, body: { role: newRole } });
  };
  const columns = [
    {
      title: "İsim",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <ul>
          <li>{name}</li>
        </ul>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => (
        <ul>
          <li>{email}</li>
        </ul>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <ul>
          <li>{role}</li>
        </ul>
      ),
    },
    {
      title: "Üyelik Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <ul>
          <li>{moment(createdAt).format("DD MMMM YYYY HH:mm:ss")}</li>
        </ul>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        if (user._id === record._id) {
          return null;
        }
        return record?.role === "admin" ? (
          <img
            src={removeUser}
            alt=""
            className="w-8 h-8 cursor-pointer"
            onClick={() => handleUserRoleChange(record._id, record.role)}
            onMouseEnter={() => {
              setTooltipContent("Kullanıcıyı Engelle");
              setTooltipVisible(true);
            }}
            onMouseLeave={() => setTooltipVisible(false)}
          />
        ) : (
          <div className="flex gap-4 items-center ">
            <div className="relative">
              <img
                src={createUser}
                alt=""
                className="w-8 h-8 cursor-pointer"
                onClick={() => handleUserRoleChange(record._id, record.role)}
                onMouseEnter={() => {
                  setTooltipContent("Admin Ekle");
                  setTooltipsVisible((prev) => ({ ...prev, createUser: true }));
                }}
                onMouseLeave={() =>
                  setTooltipsVisible((prev) => ({ ...prev, createUser: false }))
                }
              />
              {tooltipsVisible.createUser && (
                <div className="absolute bg-gray-700 text-white p-2 rounded z-[9999] -left-24 top-0 ml-2">
                  {tooltipContent}
                </div>
              )}
            </div>
            <div className="relative">
              <img
                src={userLock}
                alt=""
                className="w-8 h-8 cursor-pointer"
                onClick={() => handleBlockedUser(record._id)}
                onMouseEnter={() => {
                  setTooltipContent("Kullanıcıyı engelle");
                  setTooltipsVisible((prev) => ({ ...prev, userLock: true }));
                }}
                onMouseLeave={() =>
                  setTooltipsVisible((prev) => ({ ...prev, userLock: false }))
                }
              />
              {tooltipsVisible.userLock && (
                <div className="absolute bg-gray-700 text-white p-2 rounded z-[9999] left-9 -top-2 whitespace-nowrap">
                  {tooltipContent}
                </div>
              )}
            </div>
          </div>
        );
      },
    },
  ];
  const dataSource = data?.users?.map((item) => ({
    ...item,
    key: item._id,
  }));

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

TableData.propTypes = {
  roleAdmin: PropTypes.func.isRequired,
  blockedUser: PropTypes.func.isRequired,
  data: PropTypes.shape({
    users: PropTypes.array.isRequired,
  }),
};

export default TableData;
