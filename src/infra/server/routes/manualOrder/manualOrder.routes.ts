import { manualOrderController } from "@/controllers/manualOrder";
import { jwtAtuhenticator } from "@/middlewares/authentication";
import { authorization } from "@/middlewares/authorization";
import { AccessProfile } from "@/shared/constants";
import { Router } from "express"

const manualOrderRouter = Router()


manualOrderRouter.post(
  '/api/manualOrder',
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.ADMIN]).authorize,
  manualOrderController.createManualOrder
);

manualOrderRouter.patch(
  "/api/changeStatus/manualOrder/:id",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.ADMIN]).authorize,
  manualOrderController.changeStatusManualOrder,
);

manualOrderRouter.patch(
  "/api/cancel/manualOrder/:id",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.ADMIN]).authorize,
  manualOrderController.cancelManualOrder,
);

manualOrderRouter.put(
  "/api/manualOrder/:id",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.ADMIN]).authorize,
  manualOrderController.updateManualOrder
);

manualOrderRouter.delete(
  "/api/manualOrderItem/:id",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.ADMIN]).authorize,
  manualOrderController.removeItemManualOrder
);

manualOrderRouter.get(
  "/api/manualOrder/",
  jwtAtuhenticator.authenticate,
  authorization.ofRoles([AccessProfile.ADMIN]).authorize,
  manualOrderController.lisAllManualOrder
);



export {manualOrderRouter}