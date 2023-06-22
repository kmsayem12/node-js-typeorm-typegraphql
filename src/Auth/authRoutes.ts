import { AuthController } from "./AuthController";

export const authRoutes = [
  {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
  },
];
