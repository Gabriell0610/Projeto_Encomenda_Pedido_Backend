import { OrderDto } from "@/dto/order/OrderDto";
import { Pedido } from "@prisma/client";

interface IOrderService {
  createOrder: (order: OrderDto) => Promise<Pedido>;
}

export { IOrderService };
