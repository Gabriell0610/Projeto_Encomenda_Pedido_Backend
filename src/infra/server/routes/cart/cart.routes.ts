import { cartController } from "@/controllers/cart";
import { jwtAtuhenticator } from "@/middlewares/authentication";
import { authorization } from "@/middlewares/authorization";
import { AccessProfile } from "@/utils/constants/accessProfile";
import { Router } from "express";

const cartRouter = Router();

cartRouter.post(
  "/api/cart",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.CLIENT]).authorize,
  cartController.createCart,
);

cartRouter.get(
  "/api/cart",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.CLIENT]).authorize,
  cartController.listCart,
);

cartRouter.patch(
  "/api/cart/item/:itemId/increment",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.CLIENT]).authorize,
  cartController.incremetItemQuantity,
);
cartRouter.patch(
  "/api/cart/item/:itemId/decrement",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.CLIENT]).authorize,
  cartController.decrementItemQuantity,
);

cartRouter.delete(
  "/api/cart/item/:itemId",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.CLIENT]).authorize,
  cartController.removeItemCart,
);

export { cartRouter };
