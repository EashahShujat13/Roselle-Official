import axiosInstance from "../axios";

export const getDashboardStats = async (token) => {
  const response = await axiosInstance.get("/admin/stats", {
    headers: { Authorization: token },
  });
  return response.data;
};

export const getAllOrdersAdmin = async (token) => {
  const response = await axiosInstance.get("/admin/orders", {
    headers: { Authorization: token },
  });
  return response.data;
};

export const updateOrderStatus = async (orderId, status, token) => {
  const response = await axiosInstance.patch(
    `/admin/orders/${orderId}/status`,
    { status },
    { headers: { Authorization: token } }
  );
  return response.data;
};