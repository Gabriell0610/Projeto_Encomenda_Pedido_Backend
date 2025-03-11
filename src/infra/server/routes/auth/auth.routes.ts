import { AccessProfile } from "@/constants/access-profile";
import { authUserController } from "@/controllers/auth";
import { jwtAtuhenticator } from "@/middlewares/authentication";
import { authorization } from "@/middlewares/authorization";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/api/auth/login", authUserController.login);

authRouter.get(
  "/api/auth/user",
  jwtAtuhenticator.authenticate,
  authorization.anyRole().authorize,
  authUserController.listUserById,
);

authRouter.put(
  "/api/auth/update/:idAddress",
  jwtAtuhenticator.authenticate,
  authorization.anyRole().authorize,
  authUserController.update,
);

authRouter.delete(
  "/api/auth/delete/:idAddress",
  jwtAtuhenticator.authenticate,
  authorization.anyRole().authorize,
  authUserController.removeAddress,
);

export { authRouter };
