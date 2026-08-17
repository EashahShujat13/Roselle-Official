import axiosInstance from "../axios";

// Create Order
export const createOrder = async (orderData, token) => {
  const response = await axiosInstance.post(
    "/orders/add",
    orderData,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

// Get Logged-in User's Orders
export const getMyOrders = async (token) => {
  const response = await axiosInstance.get(
    "/orders",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

// Get Single Order
export const getSingleOrder = async (id, token) => {
  const response = await axiosInstance.get(
    `/orders/${id}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};