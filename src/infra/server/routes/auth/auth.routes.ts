import { AccessProfile } from "@/utils/constants/accessProfile";
import { authUserController } from "@/controllers/auth";
import { jwtAtuhenticator } from "@/middlewares/authentication";
import { authorization } from "@/middlewares/authorization";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/api/auth/register", authUserController.register);

authRouter.post("/api/auth/login", authUserController.login);

authRouter.post("api/auth/forgot-password", authUserController.forgetPassword)

authRouter.post("/api/auth/validate-token")
authRouter.post("/api/auth/reset-password",)

export { authRouter };
