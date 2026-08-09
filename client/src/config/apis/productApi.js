import axiosInstance from "../axios";

// Featured Products
export const getFeaturedProducts = async () => {
  const response = await axiosInstance.get("/product/featured");
  return response.data;
};

// Get All Products
export const getAllProducts = async () => {
  const response = await axiosInstance.get("/product");
  return response.data;
};

// Search Products
export const searchProducts = async (keyword) => {
  const response = await axiosInstance.get(
    `/product/search?keyword=${encodeURIComponent(keyword)}`
  );

  return response.data;
};

// Products By Category
export const getProductsByCategory = async (category) => {
  const response = await axiosInstance.get(
    `/product/category/${encodeURIComponent(category)}`
  );

  return response.data;
};

export const getSingleProduct = async (id) => {
  const response = await axiosInstance.get(`/product/${id}`);
  return response.data;
};