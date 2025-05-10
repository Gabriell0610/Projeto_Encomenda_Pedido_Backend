import { OrderDto } from "@/dto/order/OrderDto";
import { IOrderService } from "./IOrderService.type";
import { ICartRepository, IOrderRepository } from "@/repository/interfaces";

class OrderService implements IOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository, 
    private readonly cartRepository: ICartRepository
  ) {}

  createOrder = async (orderDto: OrderDto) => {
    const totalPrice = await this.cartRepository.findCartActiveByUser(orderDto.idUser)
    if(!totalPrice?.valorTotal) {
      throw new Error("Valor total não encontrado");
    }
    const order = await this.orderRepository.createOrder(orderDto, totalPrice.valorTotal);

    return order;
  };
}

export { OrderService };
