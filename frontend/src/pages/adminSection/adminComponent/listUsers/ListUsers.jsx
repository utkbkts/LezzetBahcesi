import { useEffect } from "react";
import { Button, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import {
  useDeleteUserMutation,
  useGetAdminRoleUsersMutation,
  useGetAdminUsersQuery,
} from "../../../../redux/api/UserApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
function ListUsers() {
  const { data } = useGetAdminUsersQuery();
  const [roleAdmin, { error: RoleError, isSuccess: RoleSuccess }] =
    useGetAdminRoleUsersMutation();
  const [deleteUser, { error: deleteError, isSuccess }] =
    useDeleteUserMutation();
  const { user } = useSelector((state) => state.auth);
  const handleRemoveProduct = (id) => {
    deleteUser(id);
  };
  const handleUserRoleChange = (id, currentRole) => {
    const newRole = currentRole === "user" ? "admin" : "user";
    roleAdmin({ id, body: { role: newRole } });
  };
  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Başarıyla silindi");
    }
  }, [deleteError, isSuccess]);

  useEffect(() => {
    if (RoleError) {
      toast.error(RoleError?.data?.message);
    }
    if (RoleSuccess) {
      toast.success("Başarıyla Güncellendi");
    }
  }, [RoleError, RoleSuccess]);

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
          <Button
            onClick={() => handleUserRoleChange(record._id, record.role)}
            type="primary"
          >
            <EditOutlined />
          </Button>
        ) : (
          <div className="flex gap-4 items-center">
            <Button
              onClick={() => handleRemoveProduct(record._id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
            <Button
              onClick={() => handleUserRoleChange(record._id, record.role)}
              type="primary"
            >
              <EditOutlined />
            </Button>
          </div>
        );
      },
    },
  ];
  const dataSource = data?.users?.map((item) => ({
    ...item,
    key: item._id,
  }));
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Kullanıcılar</h1>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          pagination={{ pageSize: 5 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
}

export default ListUsers;
