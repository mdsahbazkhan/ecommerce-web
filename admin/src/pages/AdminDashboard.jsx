import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = ({ token }) => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });
  const [pendingCount, setpendingCount] = useState(0);

  const [recentOrders, setRecentOrders] = useState([]);
  const [chartData, setChartData] = useState({
    salesTrend: [],
    orderStatus: [],
    revenueByMonth: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const productRes = await axios.get(backendUrl + "/api/product/list");

        const orderRes = await axios.post(
          backendUrl + "/api/order/list",
          {},
          { headers: { token } },
        );
        const orders = orderRes.data.orders || [];
        const messageRes = await axios.get(backendUrl + "/api/contact/list", {
          headers: { token },
        });
        const messages = messageRes.data.messages || [];

        const pending = messages.filter(
          (message) => message.status === "pending",
        );
        setpendingCount(pending.length);

        // Calculate revenue
        const totalRevenue = orders.reduce(
          (sum, order) => sum + (order.amount || 0),
          0,
        );

        setStats({
          products: productRes.data.products.length || [],
          orders: orders.length,
          revenue: totalRevenue,
        });

        const sortedOrders = [...orders].sort((a, b) => b.date - a.date);
        setRecentOrders(sortedOrders.slice(0, 5));

        // Process chart data
        const statusCount = orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {});

        const orderStatusData = Object.entries(statusCount).map(
          ([name, value]) => ({ name, value }),
        );

        // Monthly revenue (last 6 months)
        const monthlyData = {};
        orders.forEach((order) => {
          const date = new Date(order.date);
          const monthKey = date.toLocaleString("default", { month: "short" });
          monthlyData[monthKey] = (monthlyData[monthKey] || 0) + order.amount;
        });

        const revenueByMonth = Object.entries(monthlyData)
          .map(([month, revenue]) => ({ month, revenue }))
          .slice(-6);

        // Sales trend (last 7 days)
        const dailyData = {};

        orders.forEach((order) => {
          const day = new Date(order.date).toLocaleDateString("en-US", {
            weekday: "short",
          });

          if (!dailyData[day]) {
            dailyData[day] = { orders: 0, revenue: 0 };
          }

          dailyData[day].orders += 1;
          dailyData[day].revenue += order.amount || 0;
        });

        const salesTrend = Object.entries(dailyData)
          .slice(-7)
          .map(([day, data]) => ({
            day,
            orders: data.orders,
            revenue: data.revenue,
          }));

        setChartData({
          salesTrend,
          orderStatus: orderStatusData,
          revenueByMonth,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  const COLORS = ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6"];
  const SkeletonBox = ({ height = "h-6", width = "w-full" }) => (
    <div className={`${height} ${width} bg-gray-200 animate-pulse rounded`} />
  );
  return (
    <div className="p-3 sm:p-4 md:p-6 w-full bg-gray-50 ">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-gray-800">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-xl p-4 sm:p-5 md:p-6"
              >
                <SkeletonBox width="w-24" height="h-4" />
                <div className="mt-3">
                  <SkeletonBox width="w-16" height="h-8" />
                </div>
              </div>
            ))
        ) : (
          <>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 text-white">
              <p className="text-purple-100 text-xs sm:text-sm font-medium">
                Total Products
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
                {stats.products}
              </h3>
              <p className="text-purple-100 text-xs mt-1 sm:mt-2">
                ↑ Active listings
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 text-white">
              <p className="text-blue-100 text-xs sm:text-sm font-medium">
                Total Orders
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
                {stats.orders}
              </h3>
              <p className="text-blue-100 text-xs mt-1 sm:mt-2">↑ All time</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 text-white">
              <p className="text-green-100 text-xs sm:text-sm font-medium">
                Total Revenue
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
                ₹{stats.revenue.toLocaleString()}
              </h3>
              <p className="text-green-100 text-xs mt-1 sm:mt-2">
                ↑ Gross income
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg rounded-xl p-4 sm:p-5 md:p-6 text-white">
              <p className="text-pink-100 text-xs sm:text-sm font-medium">
                Messages
              </p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">
                {pendingCount}
              </h3>
              <p className="text-pink-100 text-xs mt-1 sm:mt-2">
                ↑ Pending replies
              </p>
            </div>
          </>
        )}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
        {loading ? (
          <>
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 md:p-6">
              <SkeletonBox height="h-6" width="w-40" />
              <div className="mt-4">
                <SkeletonBox height="h-64" />
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 md:p-6">
              <SkeletonBox height="h-6" width="w-40" />
              <div className="mt-4">
                <SkeletonBox height="h-64" />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Sales Trend Chart */}
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 md:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                Sales Trend (Last 7 Days)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData.salesTrend}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="day"
                    stroke="#6b7280"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8b5cf6"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Order Status Chart */}
            <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 md:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
                Order Status Distribution
              </h3>

              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData.orderStatus}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {chartData.orderStatus.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 md:mb-8">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
          Monthly Revenue
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData.revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#6b7280" tick={{ fontSize: 12 }} />
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-lg rounded-xl p-4 sm:p-5 md:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">
          Recent Orders
        </h3>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="w-full text-xs sm:text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 sm:p-3 md:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Order ID
                  </th>
                  <th className="p-2 sm:p-3 md:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Customer
                  </th>
                  <th className="p-2 sm:p-3 md:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Amount
                  </th>
                  <th className="p-2 sm:p-3 md:p-4 text-left text-gray-600 font-semibold whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i}>
                        <td className="p-2 sm:p-3 md:p-4">
                          <SkeletonBox height="h-4" width="w-16 sm:w-20" />
                        </td>
                        <td className="p-2 sm:p-3 md:p-4">
                          <SkeletonBox height="h-4" width="w-24 sm:w-32" />
                        </td>
                        <td className="p-2 sm:p-3 md:p-4">
                          <SkeletonBox height="h-4" width="w-12 sm:w-16" />
                        </td>
                        <td className="p-2 sm:p-3 md:p-4">
                          <SkeletonBox height="h-4" width="w-16 sm:w-20" />
                        </td>
                      </tr>
                    ))
                ) : recentOrders.length === 0 ? (
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan="4">
                      No recent orders
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-2 sm:p-3 md:p-4 font-mono text-gray-700">
                        {order._id.slice(-8)}
                      </td>
                      <td className="p-2 sm:p-3 md:p-4 text-gray-700">
                        {order.address?.firstName
                          ? `${order.address.firstName} ${order.address.lastName}`
                          : order.address?.email || "Customer"}
                      </td>
                      <td className="p-2 sm:p-3 md:p-4 font-semibold text-gray-700">
                        ₹{order.amount.toLocaleString()}
                      </td>
                      <td className="p-2 sm:p-3 md:p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Pending"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
