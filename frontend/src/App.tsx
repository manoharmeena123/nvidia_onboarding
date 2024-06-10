import React, { useLayoutEffect, useState, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Layout } from "@components/layouts/index";
import { privateRoutes } from "./routes";
import { AuthMiddleware } from "./routes/route";
import { PageNotFound } from "./Not-found";
import LoginPage from "@pages/authentication/Login";
import * as Sentry from "@sentry/react";
import {
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes
} from "react-router-dom";
import { useUserStore } from "@zustand-store/userStore/useUserStore";
import { LoadingComponent } from "@components/common";
import "./index.css";
import { steps } from "@utils/constant";
import { useAppStore } from "@zustand-store/userStore/useAppStore";

process.env.NODE_ENV === "production" &&
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DNS,
    integrations: [
      Sentry.reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      }),
      Sentry.replayIntegration()
    ],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 0.3
  });

function App() {
  const { data, authentication, loading } = useUserStore();
  const { formData } = useAppStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const authenticate = async () => {
      await authentication();
    };
    authenticate();
  }, [authentication]);

  useLayoutEffect(() => {
    if (data) {
      let navigation;
      switch (data?.currentStep) {
        case 0:
          navigation = steps[0];
          break;
        case 1:
          let currStep = 1;
          if (formData?.user?.mobile_verified) {
            currStep = 3;
          }
          navigation = steps[currStep];
          break;
        case 2:
          navigation = steps[2];
          break;
        case 3:
        // navigation = steps[0];
        // break;
        default:
          navigation = "/verify-form";
          break;
      }
      console.log("navigation-data", navigation, data);
      navigate(navigation);
      setIsAuthenticated(true);
    }
  }, [data?.currentStep]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {privateRoutes?.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <Layout>
                <AuthMiddleware isAuthenticated={isAuthenticated}>
                  {element}
                </AuthMiddleware>
              </Layout>
            }
          />
        ))}
        <Route path="*" element={<PageNotFound message={""} mode={false} />} />
      </Routes>
    </Suspense>
  );
}

const AppComponent: React.FC = App;
let ExportedApp: React.FC;

if (process.env.NODE_ENV === "production") {
  ExportedApp = Sentry.withProfiler(AppComponent);
} else {
  ExportedApp = App;
}

export default ExportedApp;
