import { OrderDto, UpdateOrderDto } from "@/dto/order/OrderDto";
import { prisma } from "@/libs/prisma";
import { IOrderRepository } from "@/repository/interfaces";
import { status } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

class OrderRepository implements IOrderRepository {
  createOrder = async (orderDto: OrderDto, currentPrice: Decimal) => {
    let numberOrder = await prisma.pedido.count();
    if (numberOrder < 0) {
      numberOrder = 1;
    } else {
      numberOrder++;
    }
    return await prisma.pedido.create({
      data: {
        carrinhoId: orderDto.idCart,
        usuarioId: orderDto.idUser,
        meioPagamento: orderDto.paymentMethod,
        status: orderDto.status,
        dataAgendamento: orderDto.schedulingDate,
        horarioDeEntrega: orderDto.deliveryTime,
        enderecoId: orderDto.idAddress,
        precoTotal: currentPrice,
        observacao: orderDto?.observation,
        numeroPedido: numberOrder,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
      },
      include: {
        carrinho: true,
        endereco: true,
        usuario: true,
      },
    });
  };

  updateOrder = async (id: string, order: UpdateOrderDto) => {
    return await prisma.pedido.update({
      where: { id: id },
      data: {
        dataAgendamento: order?.schedulingDate,
        enderecoId: order?.idAddress,
        horarioDeEntrega: order?.deliveryTime,
        meioPagamento: order?.paymentMethod,
        observacao: order?.observation,
        dataAtualizacao: new Date(),
      },
    });
  };

  cancelOrder = async (id: string) => {
    return await prisma.pedido.update({
      where: { id: id },
      data: {
        status: status.CANCELADO,
        dataAtualizacao: new Date(),
      },
      select: {
        id: true,
      },
    });
  };
}

export { OrderRepository };
