import axiosInstance from "../axiosInstance";

/*
  GET MY WISHLIST
*/
export const getMyWishlist = async (token) => {
  const response = await axiosInstance.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

/*
  ADD PRODUCT TO WISHLIST
*/
export const addToWishlist = async (productId, token) => {
  const response = await axiosInstance.post(
    "/wishlist/add",
    {
      productId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/*
  REMOVE PRODUCT FROM WISHLIST
*/
export const removeFromWishlist = async (productId, token) => {
  const response = await axiosInstance.delete(
    `/wishlist/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

/*
  CLEAR WISHLIST
*/
export const clearWishlist = async (token) => {
  const response = await axiosInstance.delete("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};