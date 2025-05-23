import { ManualOrderRepository } from "@/repository/prisma/manualOrder/ManualOrder.prisma";
import { ManualOrderService } from "@/service/manualOrder/ManualOrder.service";
import { ManualOrderController } from "./ManualOrder.controller";

const manualOrderRepository = new ManualOrderRepository()
const manualOrderService = new ManualOrderService(manualOrderRepository)
const manualOrderController = new ManualOrderController(manualOrderService)

export {manualOrderController}