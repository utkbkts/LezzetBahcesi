/* eslint-disable no-unused-vars */
import { Table, Tooltip } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import createUser from "/create-user.png";
import removeUser from "/remove-user.png";
import userLock from "/user-lock.png";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
const TableData = ({ roleAdmin, blockedUser, data }) => {
  const { user } = useSelector((state) => state.auth);
  const [arrow, setArrow] = useState("Show");
  const handleBlockedUser = (id) => {
    blockedUser(id);
  };

  const handleUserRoleChange = (id, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user";
    roleAdmin({ id, body: { role: newRole } });
  };
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);
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
          <Tooltip
            placement="topRight"
            title={"adminlikten çıkar"}
            arrow={mergedArrow}
          >
            <img
              src={removeUser}
              alt=""
              className="w-8 h-8 cursor-pointer"
              onClick={() => handleUserRoleChange(record._id, record.role)}
            />
          </Tooltip>
        ) : (
          <div className="flex gap-4 items-center ">
            <div className="relative">
              <Tooltip
                placement="topRight"
                title={" admin yap"}
                arrow={mergedArrow}
              >
                <img
                  src={createUser}
                  alt=""
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => handleUserRoleChange(record._id, record.role)}
                />
              </Tooltip>
            </div>
            <div className="relative">
              <Tooltip
                placement="topRight"
                title={"kullanıcıyı engelle"}
                arrow={mergedArrow}
              >
                <img
                  src={userLock}
                  alt=""
                  className="w-8 h-8 cursor-pointer"
                  onClick={() => handleBlockedUser(record._id)}
                />
              </Tooltip>
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
