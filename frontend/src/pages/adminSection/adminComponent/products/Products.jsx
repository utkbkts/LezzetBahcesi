import { useEffect } from "react";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../../../redux/api/ProductApi";
import TableData from "./Table";
import toast from "react-hot-toast";
import Loading from "../../../../components/loading/Loader";
const Products = () => {
  const { data } = useGetAdminProductsQuery();
  const [deleteProduct, { isSuccess, isLoading }] = useDeleteProductMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Ürün silme işlemi başarılı");
    }
  }, [isSuccess, isLoading]);

  if (isLoading) return <Loading />;
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Ürünler</h1>
      <TableData deleteProduct={deleteProduct} data={data} />
    </div>
  );
};

export default Products;
