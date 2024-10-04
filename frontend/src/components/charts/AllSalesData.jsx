import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Button } from "antd";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { useLazyAnalyticsOrderDateQuery } from "../../redux/api/AnalyticApi";
const AllSalesData = () => {
  const [getDashboardSales, { data }] = useLazyAnalyticsOrderDateQuery();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const salesData = data?.dailySalesData?.map((item) => ({
    date: item.date,
    numOrders: item.numOrders,
    totalSales: item.totalSales,
  }));

  useEffect(() => {
    if (startDate && endDate) {
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, []);
  const submitHandler = () => {
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
  };
  return (
    <div className=" rounded-lg mds:p-6 p-0 shadow-lg w-full">
      <div className="flex items-center gap-2 justify-center pb-4 mds:flex-row flex-col">
        <div className="flex flex-col">
          <label className="">Başlangıç Tarihi</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border border-gray-400 p-2 cursor-pointer"
          />
        </div>
        <div className="flex flex-col">
          <label className="">Bitiş Tarihi</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            className="border border-gray-400 p-2 cursor-pointer"
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        <Button onClick={submitHandler}>Getir</Button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#D1D5DB" />
          <YAxis yAxisId="left" stroke="#D1D5DB" />
          <YAxis yAxisId="right" orientation="right" stroke="#D1D5DB" />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="totalSales"
            stroke="#10B981"
            activeDot={{ r: 8 }}
            name="Toplam Satış"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="numOrders"
            stroke="#3B82F6"
            activeDot={{ r: 8 }}
            name="Toplam Sipariş"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AllSalesData;
