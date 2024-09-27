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
import PropTypes from "prop-types";
const SalesData = ({ data }) => {
  const salesData = data?.dailySalesData?.map((item) => ({
    date: item.date,
    numOrders: item.numOrders,
    totalSales: item.totalSales,
  }));

  return (
    <div className=" rounded-lg p-6 shadow-lg w-full">
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

SalesData.propTypes = {
  data: PropTypes.shape({
    dailySalesData: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        numOrders: PropTypes.number.isRequired,
        totalSales: PropTypes.number.isRequired,
      })
    ),
  }),
};

export default SalesData;
