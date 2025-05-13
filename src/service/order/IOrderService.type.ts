import { OrderDto, UpdateOrderDto } from "@/dto/order/OrderDto";
import { Pedido } from "@prisma/client";

interface IOrderService {
  createOrder: (order: OrderDto) => Promise<Pedido>;
  updateOrder: (id: string, order: UpdateOrderDto) => Promise<Pedido>;
  cancelOrder: (id: string) => Promise<{ id: string }>;
}

export { IOrderService };
