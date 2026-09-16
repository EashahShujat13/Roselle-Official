import Order from "../models/order.mjs";
import Products from "../models/product.mjs";
import Users from "../models/user.mjs";

// GET ALL ORDERS (admin — sees every customer's orders, not just their own)
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    // .sort({ createdAt: -1 }) means "newest first"

    res.send({
      message: "All Orders Fetched Successfully",
      orders,
    });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

// UPDATE ORDER STATUS (admin only — e.g. Pending -> Shipped)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Only allow values that actually exist in your Order model's enum.
    // This stops someone sending a garbage status like "Banana".
    const allowedStatuses = ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).send({ message: "Invalid status value" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // "new: true" means: give me back the UPDATED order, not the old one
    );

    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.send({ message: "Order status updated", order });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
};

// DASHBOARD STATS (the numbers your Dashboard page needs)
export const getDashboardStats = async (req, res) => {
  try {
    // Step 1: grab everything we need from the database, once.
    const orders = await Order.find().sort({ createdAt: -1 });
    const totalCustomers = await Users.countDocuments({ role: "customer" });

    // Step 2: total revenue = sum of every order's "total" field.
    // We skip Cancelled orders — money from a cancelled order shouldn't count as earned revenue.
    const validOrders = orders.filter((order) => order.status !== "Cancelled");
    const totalRevenue = validOrders.reduce((sum, order) => sum + order.total, 0);
    // .reduce() just means: go through every order, and keep adding order.total to a running total.

    // Step 3: build "revenue per month" for the last 9 months, for the chart.
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const now = new Date();
    const monthlyRevenue = [];

    for (let i = 8; i >= 0; i--) {
      // Go 8 months back, then 7, then 6... down to 0 (this month). Gives oldest-to-newest order.
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const targetMonth = targetDate.getMonth();
      const targetYear = targetDate.getFullYear();

      const monthTotal = validOrders
        .filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate.getMonth() === targetMonth && orderDate.getFullYear() === targetYear;
        })
        .reduce((sum, order) => sum + order.total, 0);

      monthlyRevenue.push({ month: monthNames[targetMonth], revenue: monthTotal });
    }

    // Step 4: figure out top-selling products by looking through every order's "items" array.
    // We build a running tally: { "Pearl Bracelet": { sold: 5, revenue: 22500 }, ... }
    const productTally = {};

    validOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productTally[item.productName]) {
          productTally[item.productName] = { sold: 0, revenue: 0 };
        }
        productTally[item.productName].sold += item.quantity;
        productTally[item.productName].revenue += item.price * item.quantity;
      });
    });

    // Turn that object into a sorted array, top 3 only.
    const topProducts = Object.entries(productTally)
      .map(([name, data]) => ({ name, sold: data.sold, revenue: data.revenue }))
      .sort((a, b) => b.sold - a.sold) // highest sold count first
      .slice(0, 3);

    // Step 5: 5 most recent orders, for the "Recent Orders" table.
    const recentOrders = orders.slice(0, 5).map((order) => ({
      id: order._id,
      customer: `${order.customer.firstName} ${order.customer.lastName}`,
      amount: order.total,
      status: order.status,
    }));

    res.send({
      message: "Dashboard stats fetched successfully",
      stats: {
        totalRevenue,
        totalOrders: validOrders.length,
        totalCustomers,
        monthlyRevenue,
        topProducts,
        recentOrders,
      },
    });
  } catch (e) {
    console.log("DASHBOARD STATS ERROR:", e);
    res.status(500).send({ message: e.message });
  }
};