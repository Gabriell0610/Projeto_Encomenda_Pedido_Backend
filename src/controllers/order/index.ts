import { OrderRepository } from "@/repository/prisma/order/order.prisma";
import { OrderService } from "@/service/order/Order.service";
import { OrderController } from "./order.controller";
import { CartRepository } from "@/repository/prisma/cart/cart.prisma.repository";
import { ItemRepository } from "@/repository/prisma/itens/itens.prisma";

const orderRepository = new OrderRepository();
const cartRepository = new CartRepository();
const itemRepository = new ItemRepository();
const orderService = new OrderService(orderRepository, cartRepository, itemRepository);
const orderController = new OrderController(orderService);

export { orderController };
