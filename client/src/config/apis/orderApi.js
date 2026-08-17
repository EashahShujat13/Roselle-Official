import axiosInstance from "../axios";


// CREATE ORDER
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


// GET MY ORDERS
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


// GET SINGLE ORDER
export const getSingleOrder = async (orderId, token) => {
  const response = await axiosInstance.get(
    `/orders/${orderId}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};