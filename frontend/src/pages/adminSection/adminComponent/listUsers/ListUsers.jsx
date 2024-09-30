import { useEffect } from "react";
import {
  useDeleteUserMutation,
  useGetAdminRoleUsersMutation,
  useGetAdminUsersQuery,
} from "../../../../redux/api/UserApi";
import { toast } from "react-hot-toast";
import TableData from "./Table";
function ListUsers() {
  const { data } = useGetAdminUsersQuery();

  const [roleAdmin, { error: RoleError, isSuccess: RoleSuccess }] =
    useGetAdminRoleUsersMutation();

  const [deleteUser, { error: deleteError, isSuccess }] =
    useDeleteUserMutation();

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

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Kullanıcılar</h1>
      <TableData deleteUser={deleteUser} roleAdmin={roleAdmin} data={data} />
    </div>
  );
}

export default ListUsers;
