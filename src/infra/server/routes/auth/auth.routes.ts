import { authUserController } from "@/controllers/auth";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/api/auth/login", authUserController.login);

export { authRouter };
