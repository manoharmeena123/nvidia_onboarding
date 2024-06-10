import axios, { AxiosInstance, AxiosError } from "axios";
import { useAppStore } from "@zustand-store/userStore/useAppStore";

class ApiClient {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL,
      withCredentials: true,
    });

    this.instance.interceptors.request.use(
      (config) => {
        const token = useAppStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          const clearToken = useAppStore.getState().clearToken;
          if (clearToken) {
            clearToken();
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public handleError(error: AxiosError): void {
    if (axios.isAxiosError(error)) {
      console.error("Error:", error.response?.data);
      const errorMessage =
        (error.response?.data as { message?: string }).message ||
        "An error occurred";
      throw new Error(errorMessage);
    }
    console.error("Error:", error);
    throw error;
  }

  async del<T>(url: string): Promise<T> {
    try {
      const response = await this.instance.delete<T>(url);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  async put<T, U>(url: string, data: U): Promise<T> {
    try {
      const response = await this.instance.put<T>(url, data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  async post<T, U>(url: string, data: U): Promise<T> {
    try {
      const response = await this.instance.post<T>(url, data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }

  async get<T>(url: string): Promise<T> {
    try {
      const response = await this.instance.get<T>(url);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        this.handleError(error);
        throw error;
      } else {
        throw error;
      }
    }
  }
}

const apiClient = new ApiClient();

export default apiClient;
