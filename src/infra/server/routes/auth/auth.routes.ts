import { AccessProfile } from "@/constants/accessProfile";
import { authUserController } from "@/controllers/auth";
import { jwtAtuhenticator } from "@/middlewares/authentication";
import { authorization } from "@/middlewares/authorization";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/api/auth/register", authUserController.register);

authRouter.post("/api/auth/login", authUserController.login);

export { authRouter };
