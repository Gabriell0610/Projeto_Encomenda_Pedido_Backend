import { ItemUpdateDto, ItemCreateDto } from "@/domain/dto/itens/ItensDto";
import { IItemsRepository } from "@/repository/interfaces";
import { statusItem } from "@prisma/client";
import { prisma } from "@/libs/prisma";

class ItemRepository implements IItemsRepository {
  create = async (dto: ItemCreateDto) => {
    return await prisma.item.create({
      data: {
        descricao: dto.description,
        preco: dto.price,
        image: dto.image,
        disponivel: dto.available,
        nome: dto.name,
        dataCriacao: new Date(),
        dataAtualizacao: new Date(),
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        image: true,
        disponivel: true,
      },
    });
  };

  listAll = async () => {
    return prisma.item.findMany();
  };

  listById = async (id: string) => {
    const item = await prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        image: true,
        disponivel: true,
      },
    });

    return item;
  };

  listActiveItens = async () => {
    return await prisma.item.findMany({
      where: { disponivel: statusItem.ATIVO },
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        image: true,
        disponivel: true,
      },
    });
  };

  update = async (dto: ItemUpdateDto, itemId: string) => {
    const item = await prisma.item.update({
      where: { id: itemId },
      data: {
        ...dto,
        dataAtualizacao: new Date(),
      },
    });
    return item;
  };

  inactiveItem = async (idItem: string) => {
    return await prisma.item.update({
      where: { id: idItem },
      data: {
        disponivel: statusItem.INATIVO,
        dataAtualizacao: new Date(),
      },
      select: {
        id: true,
        nome: true,
        descricao: true,
        preco: true,
        image: true,
        dataCriacao: true,
        dataAtualizacao: true,
        disponivel: true,
      },
    });
  };
}

export { ItemRepository };
