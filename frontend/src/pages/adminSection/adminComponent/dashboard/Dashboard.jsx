import { useEffect } from "react";
import { useLazyAnalyticsOrderQuery } from "../../../../redux/api/AnalyticApi";
import SalesData from "../../../../components/charts/SalesData";
import AllSalesData from "../../../../components/charts/AllSalesData";
function Dashboard() {
  const [getDashboardSales, { data }] = useLazyAnalyticsOrderQuery();
  const fetchSalesData = () => {
    getDashboardSales();
  };
  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Restoran Yönetim Paneli
      </h1>

      {/* Genel Bilgiler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Toplam Satış
          </h2>
          <p className="text-2xl font-bold text-green-600">
            ₺{data?.analyticsData?.totalSales.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Toplam Siparişler
          </h2>
          <p className="text-2xl font-bold text-blue-600">
            {data?.analyticsData?.numOrders}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Bugünkü Siparişler
          </h2>
          <p className="text-2xl font-bold text-blue-600">
            {data?.analyticsData?.dailyOrderCount}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Müşteri Geri Bildirimleri
          </h2>
          <p className="text-2xl font-bold text-yellow-600">
            {" "}
            {data?.analyticsData?.totalReviews}
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
          {data?.analyticsData?.popularData?.map((item, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">
                {item._id}
              </span>
              <span className="text-lg font-bold text-gray-800">
                ({item.totalSales}) Adet Satıldı.
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Haftalık Satışlar
          </h2>
          <div className="h-full w-full  rounded-lg flex items-center justify-center">
            <SalesData data={data} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2>Tarihlere göre sıralama</h2>
          <div className="h-full w-full  rounded-lg flex items-center justify-center">
            <AllSalesData />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
