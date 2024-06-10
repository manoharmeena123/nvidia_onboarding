import { create } from "zustand";
import { UserResponse } from "services/types/api-types";
import { userAuthentication } from "@services/api/auth";
import { useAppStore } from "./useAppStore";

interface UserStoreState {
  data: UserResponse | null;
  loading: boolean;
  error: string | null | {};
  authentication: () => Promise<boolean | UserResponse | null>;
}

export const useUserStore = create<UserStoreState>((set) => ({
  data: null,
  loading: false,
  error: null,
  authentication: async (): Promise<boolean | UserResponse | null> => {
    set({ loading: true, error: null });
    try {
      const response = await userAuthentication(); // Ensure correct type here
      console.log('Response ---- ', response)
      if (response.status === "success") {
        set({
          data: response.data,
          loading: false,
          error: null,
        });
        const setForms = useAppStore.getState().setForm;
        setForms(response.data);
        return response.data;
      } else {
        throw new Error("User is not authorized!");
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
