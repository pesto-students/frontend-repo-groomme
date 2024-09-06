import {
  ErrorResponse,
  SignInFormValuesType,
  SignUpFormValuesType,
} from "../types/authTypes";
import axiosInstance from "../config/axiosInstance";
import { authUrls } from "../urls/urls";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export async function signUpService(
  signUpValues: SignUpFormValuesType,
  handleSuccessSignUp: () => void
) {
  const { email, firstname, lastname, password, userType } = signUpValues;
  const signUpPayload = {
    email: email,
    password: password,
    firstName: firstname,
    lastName: lastname,
    userType: userType,
  };
  try {
    const response = await axiosInstance.post(authUrls.signUp, signUpPayload);
    toast.success(response.data.message);
    handleSuccessSignUp();
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorData: ErrorResponse = error.response.data;
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
    } else {
      console.error("Unexpected Error: signUpService", error);
      throw new Error("An unexpected error occurred in signUpService");
    }
  }
}

export async function signInService(
  signInValues: SignInFormValuesType,
  handleSuccessSignIn: (userType: string) => void
) {
  const { email, password } = signInValues;
  const signInPayload = {
    email: email,
    password: password,
  };
  try {
    const response = await axiosInstance.post(authUrls.signIn, signInPayload);
    toast.success(response.data.message);

    sessionStorage.setItem("auth_token", response.data.auth_token);
    sessionStorage.setItem("userType", response.data.userDetails.userType);
    handleSuccessSignIn(response.data.userDetails.userType);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errorData: ErrorResponse = error.response.data;
        toast.error(errorData.message);
        throw new Error(errorData.message);
      }
    } else {
      console.error("Unexpected Error signInService:", error);
      throw new Error("An unexpected error occurred in signInService");
    }
  }
}

export const validateUserToken = async () => {
  try {
    const response: AxiosResponse = await axiosInstance.get(
      authUrls.validateToken
    );
    if (response.data.userId) {
      return response.data;
    } else {
      console.error("Error validating token:", response);
      throw new Error("Error validate token");
    }
  } catch (error) {
    console.error("Error validating token:", error);
    return error;
  }
};

export const logoutService = async (handleLogOutSuccess: Function) => {
  try {
    const response: AxiosResponse = await axiosInstance.post(authUrls.logout);
    if (response.data.message) {
      await handleLogOutSuccess();
      toast.success(response.data.message);
    } else {
      toast.error("An unknown error occured. Please try again.");
      console.error("Error logout :", response);
      throw new Error("Error logout ");
    }
  } catch (error) {
    toast.error("An unknown error occured. Please try again.");
    console.error("Error logout :", error);
    return error;
  }
};

export const updatePasswordService = async ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axiosInstance.put(authUrls.updatePassword, {
      currentPassword,
      newPassword,
    });

    toast.success(response.data.message);
    return true;
  } catch (error: any) {
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("An unknown error occurred. Please try again.");
      console.error("Error updatePasswordService :", error);
    }
    return false;
  }
};
