import { Router } from "express";
import { userController } from "../../../../controllers/user";
import { jwtAtuhenticator } from "@/middlewares/authentication";
import { authorization } from "@/middlewares/authorization";
import { AccessProfile } from "@/shared/constants/accessProfile";

const userRouter = Router();

userRouter.get("/api/users", userController.list);

userRouter.get(
  "/api/users/me",
  jwtAtuhenticator.authenticate,
  authorization.anyRole().authorize,
  userController.listUserById,
);

userRouter.put(
  "/api/users",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.CLIENT]).authorize,
  userController.updateUser,
);

//ADDRESS
userRouter.post(
  "/api/users/address",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.CLIENT]).authorize,
  userController.addAddress,
);

userRouter.put(
  "/api/users/:idAddress/address",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.CLIENT]).authorize,
  userController.updateUserAddress,
);

userRouter.delete(
  "/api/users/:idAddress/address",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.CLIENT]).authorize,
  userController.removeAddress,
);

export { userRouter };
