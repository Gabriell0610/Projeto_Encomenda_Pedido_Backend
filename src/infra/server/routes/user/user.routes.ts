import { Router } from "express";
import { userController } from "../../../../controllers/user";

const userRouter = Router();

userRouter.post("/users", userController.register);

userRouter.get("/users", userController.list);

export { userRouter };
