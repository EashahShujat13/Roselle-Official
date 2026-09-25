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

export const addProduct = async (formData, token) => {
  const response = await axiosInstance.post("/product/add", formData, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};


export const updateProduct = async (id, formData, token) => {
  const response = await axiosInstance.put(`/product/${id}`, formData, {
    headers: {
      Authorization: token,
    },
  });
  return response.data;
};

export const deleteProduct = async (id, token) => {
  const response = await axiosInstance.delete(`/product/${id}`, {
    headers: { Authorization: token },
  });
  return response.data;
};