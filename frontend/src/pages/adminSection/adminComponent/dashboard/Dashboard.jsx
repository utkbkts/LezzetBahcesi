import {
  useGetAdminOrdersQuery,
  useGetTodayOrdersQuery,
} from "../../../../redux/api/OrderApi";
import { useGetAdminProductsQuery } from "../../../../redux/api/ProductApi";

function Dashboard() {
  const { data: adminOrdersData } = useGetAdminOrdersQuery();
  const { data: todayOrdersData } = useGetTodayOrdersQuery();
  const { data: getAdminProducts } = useGetAdminProductsQuery();

  //toplam satışlar
  const totalAmount = adminOrdersData?.product?.reduce(
    (total, acc) => total + acc.totalAmount,
    0
  );
  //toplam yorum sayısı
  const totalNumOfReviews = getAdminProducts?.product?.reduce(
    (total, acc) => total + acc.numOfReviews,
    0
  );
  //bir gün içinde yapılan satışlar
  const topThreePopular = [...(adminOrdersData?.groupCheck || [])]?.sort(
    (a, b) => b.totalQuantity - a.totalQuantity
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Restoran Yönetim Paneli
      </h1>

      {/* Genel Bilgiler */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Toplam Satış
          </h2>
          <p className="text-2xl font-bold text-green-600">
            ₺{totalAmount?.toFixed(2) || "0.00"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Bugünkü Siparişler
          </h2>
          <p className="text-2xl font-bold text-blue-600">
            {todayOrdersData?.count || "0.00"}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Müşteri Geri Bildirimleri
          </h2>
          <p className="text-2xl font-bold text-yellow-600">
            {totalNumOfReviews || "0"}
          </p>
        </div>
      </div>

      {/* Popüler Menü Öğeleri */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="!text-2xl font-semibold text-gray-800 mb-4">
          En çok Satılanlar
        </h2>
        <hr />
        <ul className="space-y-4">
          {topThreePopular &&
            topThreePopular.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">
                  {item.name}
                </span>
                <span className="text-lg font-bold text-gray-800">
                  ({item.totalQuantity}) Adet Satıldı.
                </span>
              </li>
            ))}
        </ul>
      </div>

      {/* Günlük Satış Grafiği (Placeholder) */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Günlük Satışlar
        </h2>
        <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Grafik burada gösterilecek.</span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
