import { OrderDto } from "@/dto/order/OrderDto";
import { prisma } from "@/libs/prisma";
import { IOrderRepository } from "@/repository/interfaces";

class OrderRepository implements IOrderRepository {
  createOrder = async (orderDto: OrderDto) => {
    let allOrder = await prisma.pedido.count();
    if (allOrder < 0) {
      allOrder = 1;
    } else {
      allOrder++;
    }
    return await prisma.pedido.create({
      data: {
        carrinhoId: orderDto.idCart,
        usuarioId: orderDto.idUser,
        meioPagamento: orderDto.paymentMethod,
        status: orderDto.status,
        dataAgendamento: orderDto.schedulingDate,
        precoTotal: orderDto.totalPrice,
        numeroPedido: allOrder,
        enderecoId: orderDto.idAddress,
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
}

export { OrderRepository };
