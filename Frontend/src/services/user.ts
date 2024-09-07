import { AxiosResponse } from "axios";
import axiosInstance from "../config/axiosInstance";
import { userUrls } from "../urls/urls";

export const getUserDetailsService = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      userUrls.getUserDetails
    );
    if (response.data) {
      return response.data;
    } else {
      console.error("Error logout :", response);
      throw new Error("Error logout ");
    }
  } catch (error) {
    console.error("Error logout :", error);
    return error;
  }
};
