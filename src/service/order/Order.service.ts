import { OrderDto } from "@/dto/order/OrderDto";
import { IOrderService } from "./IOrderService.type";
import { IOrderRepository } from "@/repository/interfaces";

class OrderService implements IOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  createOrder = async (orderDto: OrderDto) => {
    const order = await this.orderRepository.createOrder(orderDto);

    return order;
  };
}

export { OrderService };
