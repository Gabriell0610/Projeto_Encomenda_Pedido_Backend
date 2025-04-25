import { cartController } from "@/controllers/cart";
import { Router } from "express";

const cartRouter = Router()

cartRouter.post("/api/cart",cartController.createCart )


export {cartRouter}