// src/api/userApi.ts
import { UserResponse, UserResponseType } from "services/types/api-types";
import apiClient from "./apiClient";
import { FormData } from "@zustand-store/userStore/useAppStore";

export interface verifyForm {
  step: string;
  stepData: FormData;
}
interface OtpResponse {
  success: boolean;
  message: string;
}
interface OtpRequest {
  phoneNumber: string;
}

export const userAuthentication = async (): Promise<UserResponseType> => {
  const response: any = await apiClient.get<UserResponse>("/auth/profile");
  return response;
};

export const updateUserProfile = async (userData: {
  firstName: string;
  lastName: string;
}): Promise<UserResponse> => {
  const response: any = await apiClient.put<UserResponse, typeof userData>(
    "/auth/profile",
    userData
  );
  return response.data;
};

export const generateOtp = async (
  phoneNumber: string
): Promise<OtpResponse> => {
  try {
    const response = await apiClient.post<OtpResponse, OtpRequest>(
      "/twilio/verify",
      { phoneNumber }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkOtp = async (
  phoneNumber: string,
  code: string
): Promise<boolean> => {
  const response: any = await apiClient.post("/twilio/check", {
    phoneNumber,
    code,
  });
  if (response.status === "success") {
    return true;
  }
  return false;
};

export const verifyForm = async <T>(data: {
  inquiryId: string;
  status: string;
  fields: Record<string, any>;
}): Promise<T> => {
  const verifyFormData = {
    stepData: data,
  };
  const response: any = await apiClient.post<string, typeof verifyFormData>(
    "/profile/update",
    verifyFormData
  );
  return response;
};

export const verifyPersona = async <T>(data: {
  inquiryId: string;
  status: string;
  fields: Record<string, any>;
}): Promise<T> => {
  const verifyFormData = {
    personaVerified: data,
  };
  const response: any = await apiClient.post<string, typeof verifyFormData>(
    "/users/persona-verified",
    verifyFormData
  );
  return response;
};
