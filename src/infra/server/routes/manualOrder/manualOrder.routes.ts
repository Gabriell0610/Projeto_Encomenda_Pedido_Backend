import { manualOrderController } from "@/controllers/manualOrder";
import { Router } from "express";


const manualOrderRouter = Router()

manualOrderRouter.post('/api/manualOrder', manualOrderController.create)

export {manualOrderRouter}