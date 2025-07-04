import { ItemUpdateDto, ItemCreateDto } from "@/domain/dto/itens/ItensDto";
import { IItemsRepository } from "@/repository/interfaces";
import { statusItem } from "@prisma/client";
import { prisma } from "@/libs/prisma";

class ItemRepository implements IItemsRepository {
  listActiveItemById = async (itemId: string) => {
    return await prisma.item.findFirst({
      where: { id: itemId, disponivel: statusItem.ATIVO },
      select: {
        descricao: true,
        id: true,
        disponivel: true,
        image: true,
        nome: true,
        preco: true,
        tamanho: true,
      },
    });
  };
  create = async (dto: ItemCreateDto) => {
    return await prisma.item.create({
      data: {
        descricao: dto.description,
        preco: dto.price,
        image: dto.image,
        disponivel: dto.available,
        tamanho: dto.size,
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
        tamanho: true,
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
        tamanho: true,
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
