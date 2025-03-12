import { Router } from "express";
import { userController } from "../../../../controllers/user";

const userRouter = Router();

userRouter.post("/api/auth/register", userController.register);

userRouter.get("/api/users", userController.list);

export { userRouter };
