import { ItensDto } from "@/dto/itens/itensDto";
import { IItensRepository } from "@/repository/interface";
import { Item } from "@prisma/client";
import { prisma } from "@/libs/prisma";

class ItensRepository implements IItensRepository {
  create = async (data: ItensDto) => {
    await prisma.item.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        preco: data.preco,
        image: data.image,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
        disponivel: data.disponivel,
      },
    });
  };

  list = async () => {
    return prisma.item.findMany();
  };
}

export { ItensRepository };
