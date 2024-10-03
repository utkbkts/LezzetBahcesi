import catchAsyncError from "../middleware/catch.middleware.js";
import Order from "../models/order.models.js";
import Product from "../models/product.models.js";

const getAnalyticsData = async () => {
  //satışlar
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,
        numOrders: { $sum: 1 },
        totalSales: { $sum: "$totalAmount" },
      },
    },
  ]);
  //yorumlar
  const reviewsData = await Product.aggregate([
    {
      $unwind: "$reviews", // Her bir yorumu ayrı bir belgeye dönüştürüyoruz belgeyi açar yani bi array ise içine girer
    },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 }, // Her bir yorum için 1 ekliyoruz her yorumu sayıyoruz
      },
    },
  ]);
  //popüler 3 ürün

  const popularData = await Order.aggregate([
    {
      $unwind: "$basketItems",
    },
    {
      $group: {
        _id: "$basketItems.title",
        totalSales: { $sum: "$basketItems.quantity" },
      },
    },
    {
      $sort: { totalSales: -1 },
    },
    {
      $limit: 3,
    },
  ]);
  //günlük satışlar
  const startOfDay = new Date();
  const endOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);
  endOfDay.setUTCHours(23, 59, 59, 999);
  const dailyOrderCount = await Order.countDocuments({
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });

  const { numOrders, totalSales } = salesData[0] || {
    numOrders: 0,
    totalSales: 0,
  };
  const totalReviews = reviewsData[0]?.totalReviews || 0;

  return {
    numOrders,
    totalSales,
    totalReviews,
    dailyOrderCount,
    popularData,
  };
};

const getDailySalesData = async (startDate, endDate) => {
  try {
    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalSales: { $sum: "$totalAmount" },
          numOrders: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const dateArray = getDatesInRange(startDate, endDate);

    return dateArray.map((date) => {
      const foundData = dailySalesData.find((item) => item._id === date);

      return {
        date,
        numOrders: foundData?.numOrders || 0,
        totalSales: foundData?.totalSales || 0,
      };
    });
  } catch (error) {
    throw error;
  }
};

function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

const getSales = catchAsyncError(async (req, res, next) => {
  const analyticsData = await getAnalyticsData();

  const endDateDefault = new Date();
  const startDateDefault = new Date(
    endDateDefault.getTime() - 7 * 24 * 60 * 60 * 1000
  );

  const startDateQuery = req.query.startDate
    ? new Date(req.query.startDate)
    : startDateDefault;
  const endDateQuery = req.query.endDate
    ? new Date(req.query.endDate)
    : endDateDefault;

  startDateQuery.setUTCHours(0, 0, 0, 0);
  endDateQuery.setUTCHours(23, 59, 59, 999);

  const dailySalesData = await getDailySalesData(startDateQuery, endDateQuery);

  res.json({
    analyticsData,
    dailySalesData,
  });
});

export default { getSales };
