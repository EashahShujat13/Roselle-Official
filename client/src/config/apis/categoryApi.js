import axiosInstance from "../axios";

export const getAllCategories = async () => {
  const response = await axiosInstance.get("/category");
  return response.data; // { message, categories }
};

export const createCategory = async (payload) => {
  const response = await axiosInstance.post("/category", payload);
  return response.data;
};

export const updateCategory = async (id, payload) => {
  const response = await axiosInstance.put(`/category/${id}`, payload);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/category/${id}`);
  return response.data;
};