import { create } from "zustand";
import { verifyForm } from "@services/api/auth";
import { UserResponse } from "@services/types/api-types";

export interface FormData {
  [key: string]: any;
}

export interface AppState {
  loading: boolean;
  error: string | null;
  currentStep: number;
  isFormValid: boolean;
  formData: { [key: string]: any };
  setCurrentStep: (step: number) => void;
  submitForm: (page: string) => Promise<boolean>;
  setIsFormValid: (isValid: boolean) => void;
  setFormdata: (page: string, data: FormData, object?: string) => void;
  clearToken?: () => void | undefined;
  token?: string;
  resetForm: () => void;
  nextStep: () => void;
  previousStep: () => void;
  setForm: (data: UserResponse | null) => void;
}

export interface ResponseData {
  status: string;
  error: object;
  data: object;
}

export const useAppStore = create<AppState>((set, get) => ({
  loading: false,
  error: "",
  currentStep: 1,
  formData: {},
  isFormValid: false,
  setForm: (data: UserResponse | null) => {
    set({ formData: data || {} });
  },
  setCurrentStep: (step: number) => set({ currentStep: step }),
  setFormdata: (page: string, data: FormData, object = "object") => {
    if (object === "object") {
      set((state) => {
        const existingData = state.formData[page] || {};
        return {
          formData: {
            ...state.formData,
            [page]: { ...existingData, ...data },
          },
        };
      });
    }
    if (object === "array") {
      set((state) => ({
        formData: {
          ...state.formData,
          [page]: data,
        },
      }));
    }
  },
  resetForm: () => set({ currentStep: 1, formData: {} }),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  previousStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setIsFormValid: (isValid: boolean) => set({ isFormValid: isValid }),
  submitForm: async (page: string) => {
    set({ loading: true, error: null });
    const { formData } = get();
    console.log("verify form", formData, page);
    try {
      const response: ResponseData = await verifyForm(formData[page]);
      set({ loading: false, error: null });
      if (response.status === "success") {
        return true;
      } else {
        throw new Error("An error occurred!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        set({ error: error.message, loading: false });
      } else {
        set({ error: "An unknown error occurred", loading: false });
      }
      return false;
    }
  },
}));
