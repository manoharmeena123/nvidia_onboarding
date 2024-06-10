import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@lib/ThemeProvider";
import App from "./App";
import "./index.css";
import { SnackbarProvider } from "notistack";

const AppContainer = () => (
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")!).render(<AppContainer />);
