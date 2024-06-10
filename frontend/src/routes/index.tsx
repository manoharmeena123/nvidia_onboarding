import { Route } from "./route.type";
import { Navigate } from "react-router-dom";
import { lazy } from "react";

const SkillSectionPage = lazy(() => import("@pages/skills-details-section/SkillSectionPage"));
const FinishSetup = lazy(() => import("@pages/finishSetUpPage/FinishSetup"));
const VerifyForm = lazy(() => import("@pages/verfiyPage/VerifyForm"));
const VerifyMobileNumber = lazy(() => import("@pages/account-setup/VerifyMobileNumber"));
const IdentityVerification = lazy(() => import("@pages/identity-verification/IdentityVerifcation"));
const PersonaVerification = lazy(() => import("@pages/persona/persona-iframe"));
const PersonaVerificationConfirm = lazy(() => import("@pages/persona/IdentityConfirm"));

export const privateRoutes: Route[] = [
  {
    path: "/",
    element: <Navigate to="/verify-form" />,
  },
  {
    path: "/verify-form",
    element: <VerifyForm />,
  },
  {
    path: "/identity-verification",
    element: <IdentityVerification />,
  },
  {
    path: "/persona-verification",
    element: <PersonaVerification />,
  },
  {
    path: "/skill-section",
    element: <SkillSectionPage />,
  },
  {
    path: "/finish-setup",
    element: <FinishSetup />,
  },
  {
    path: "/verify-mobile",
    element: <VerifyMobileNumber />,
  },
  {
    path: "/identity-confirm",
    element: <PersonaVerificationConfirm />,
  },
];
