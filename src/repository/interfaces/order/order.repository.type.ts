import { OrderEntity } from "@/domain/model/OrderEntity";
import { OrderDto, UpdateOrderDto } from "@/domain/dto/order/OrderDto";
import { Decimal } from "@prisma/client/runtime/library";

interface IOrderRepository {
  createOrder: (orderDto: OrderDto, currentPrice: Decimal) => Promise<{ id: string }>;
  updateOrder: (id: string, order: UpdateOrderDto) => Promise<Partial<OrderEntity>>;
  cancelOrder: (id: string) => Promise<{ id: string }>;
  listOrdersByClientId: (idClient: string) => Promise<Partial<OrderEntity>[]>;
  listAllOrders: () => Promise<Partial<OrderEntity>[]>;
  listOrderById: (id: string) => Promise<Partial<OrderEntity> | null>;
}

export { IOrderRepository };
