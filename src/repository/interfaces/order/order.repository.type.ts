import { OrderDto, UpdateOrderDto } from "@/dto/order/OrderDto";
import { Pedido } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface IOrderRepository {
  createOrder: (orderDto: OrderDto, currentPrice: Decimal) => Promise<Pedido>;
  updateOrder: (id: string, order: UpdateOrderDto) => Promise<Pedido>;
  cancelOrder: (id: string) => Promise<{ id: string }>;
}

export { IOrderRepository };
