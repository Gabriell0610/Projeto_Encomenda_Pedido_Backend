import { IPedido } from "@/domain/model/IPedido";
import { OrderDto, UpdateOrderDto } from "@/domain/dto/order/OrderDto";

interface IOrderService {
  createOrder: (order: OrderDto) => Promise<{ id: string }>;
  updateOrder: (id: string, order: UpdateOrderDto) => Promise<IPedido>;
  cancelOrder: (id: string) => Promise<{ id: string }>;
  listOrdersByClientId: (idClient: string) => Promise<IPedido[]>;
  listAllOrders: () => Promise<IPedido[]>;
  listOrderById: (id: string) => Promise<IPedido | null>;
}

export { IOrderService };
