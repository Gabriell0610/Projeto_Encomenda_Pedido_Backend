import { OrderDto } from "@/dto/order/OrderDto";
import { Pedido } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

interface IOrderRepository {
  createOrder: (orderDto: OrderDto, currentPrice: Decimal) => Promise<Pedido>;
}

export { IOrderRepository };
