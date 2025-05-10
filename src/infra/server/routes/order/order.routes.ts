import { orderController } from "@/controllers/order";
import { Router } from "express";

const orderRouter = Router();

orderRouter.post("/api/order", orderController.create);

export { orderRouter };
