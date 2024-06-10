// Define the state interface
export interface AppState {
    count: number;
    token: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
  }