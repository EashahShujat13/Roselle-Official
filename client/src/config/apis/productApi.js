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
    `/product/search?keyword=${keyword}`
  );

  return response.data;

};