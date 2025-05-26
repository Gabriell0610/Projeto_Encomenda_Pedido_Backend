
import { ItemRepository } from "@/repository/prisma/itens/itens.prisma";
import { ManualOrderController } from "./ManualOrder.controller";
import { ManualOrderRepository } from "@/repository/prisma/manualOrder/ManualOrder.prisma";
import { ManualOrderService } from "@/service/manualOrder/ManualOrder.service";

const manualOrderRepository = new ManualOrderRepository();
const itemRepository = new ItemRepository();
const orderService = new ManualOrderService(manualOrderRepository, itemRepository);
const manualOrderController = new ManualOrderController(orderService);

export { manualOrderController };
