import React from "react";

import { useAuthentication } from "../hooks/useAuthentication";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => {
  const { user } = useAuthentication();
  return user ? <AppRoutes /> : <AuthRoutes />;
};
