import { OrderRepository } from "@/repository/prisma/order/order.prisma";
import { OrderService } from "@/service/order/Order.service";
import { OrderController } from "./order.controller";

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

export { orderController };
