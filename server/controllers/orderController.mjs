import Order from "../models/order.mjs";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const {
      customer,
      shippingAddress,
      items,
      subtotal,
      delivery,
      total,
      paymentMethod,
    } = req.body;

    // Check required data
    if (
      !customer ||
      !shippingAddress ||
      !items ||
      items.length === 0
    ) {
      return res.status(400).json({
        message: "Customer, shipping address and items are required",
      });
    }

    // Create order
    const order = await Order.create({
      user: req.userId,

      customer,

      shippingAddress,

      items,

      subtotal,

      delivery,

      total,

      paymentMethod: paymentMethod || "Cash on Delivery",

      status: "Pending",
    });

    return res.status(201).json({
      message: "Order Created Successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// GET LOGGED-IN USER ORDERS
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      message: "Orders Fetched Successfully",
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);

    return res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// GET SINGLE ORDER
export const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      user: req.userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json({
      message: "Order Fetched Successfully",
      order,
    });
  } catch (error) {
    console.error("Get Single Order Error:", error);

    return res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};