import { OrderEntity } from "@/domain/model/OrderEntity";
import { OrderDto, UpdateOrderDto } from "@/domain/dto/order/OrderDto";

interface IOrderService {
  createOrder: (order: OrderDto) => Promise<{ id: string }>;
  updateOrder: (id: string, order: UpdateOrderDto) => Promise<OrderEntity>;
  cancelOrder: (id: string) => Promise<{ id: string }>;
  listOrdersByClientId: (idClient: string) => Promise<Partial<OrderEntity>[]>;
  listAllOrders: () => Promise<Partial<OrderEntity>[]>;
  listOrderById: (id: string) => Promise<Partial<OrderEntity> | null>;
}

export { IOrderService };
