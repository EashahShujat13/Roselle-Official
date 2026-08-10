import axiosInstance from "../axios";



export const signupUser = async (signupData) => {
  const response = await axiosInstance.post(
    "/auth/signup",
    signupData
  );

  return response.data;
};

export const forgotPassword = async (data) => {

  const response = await api.post(
    "/forgot-password",
    data
  );

  return response.data;

};

export const resetPassword = async (token, data) => {

  const response = await api.post(
    `/reset-password/${token}`,
    data
  );

  return response.data;

};


export const loginUser = async (loginData) => {
  const response = await axiosInstance.post(
    "/auth/login",
    loginData
  );

  return response.data;
};



export const googleLoginUser = async (data) => {
  const response = await axiosInstance.post(
    "/auth/google-login",
    data
  );

  return response.data;
};

export const getMyProfile = async (token) => {
  const response = await axiosInstance.get(
    "/auth/profile",
    {
      headers: {
        Authorization: token,
      },
    }
  );

  return response.data;
};

export const logoutUser = async (token) => {
  const response = await axiosInstance.post(
    "/auth/logout",
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );

  return response.data;
};