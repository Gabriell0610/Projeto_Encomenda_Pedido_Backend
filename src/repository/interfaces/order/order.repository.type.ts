import { OrderDto } from "@/dto/order/OrderDto";
import { Pedido } from "@prisma/client";

interface IOrderRepository {
  createOrder: (orderDto: OrderDto) => Promise<Pedido>;
}

export { IOrderRepository };
