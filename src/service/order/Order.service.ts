import { OrderDto, UpdateOrderDto } from "@/dto/order/OrderDto";
import { IOrderService } from "./IOrderService.type";
import { ICartRepository, IOrderRepository } from "@/repository/interfaces";
import { BadRequestException } from "@/core/error/exceptions/bad-request-exception";

class OrderService implements IOrderService {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly cartRepository: ICartRepository,
  ) {}

  createOrder = async (orderDto: OrderDto) => {
    const cart = await this.cartRepository.findCartActiveByUser(orderDto.idUser);
    if (!cart?.valorTotal) {
      throw new Error("Valor total não encontrado");
    }

    await this.cartRepository.changeStatusCart(cart.id);

    const order = await this.orderRepository.createOrder(orderDto, cart.valorTotal);

    return order;
  };

  updateOrder = async (id: string, order: UpdateOrderDto) => {
    const updatedOrder = await this.orderRepository.updateOrder(id, order);
    if (!updatedOrder) {
      throw new BadRequestException("valor não enviado");
    }

    return updatedOrder;
  };

  cancelOrder = async (id: string) => {
    const canceledOrder = await this.orderRepository.cancelOrder(id);
    return canceledOrder;
  };
}

export { OrderService };
