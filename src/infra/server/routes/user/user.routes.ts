import { Router } from "express";
import { userController } from "../../../../controllers/user";
import { jwtAtuhenticator } from "@/middlewares/authentication";
import { authorization } from "@/middlewares/authorization";
import { AccessProfile } from "@/constants/access-profile";

const userRouter = Router();

userRouter.post("/api/auth/register", userController.register);

userRouter.get(
  "/api/users",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.ADMIN, AccessProfile.CLIENT]).authorize,
  userController.list,
);

export { userRouter };
