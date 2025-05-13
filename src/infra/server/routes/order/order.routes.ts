import { orderController } from "@/controllers/order";
import { Router } from "express";

const orderRouter = Router();

orderRouter.post("/api/order", orderController.create);
orderRouter.put("/api/order/:id", orderController.update);
orderRouter.patch("/api/order/:id", orderController.cancelOrder);

export { orderRouter };
