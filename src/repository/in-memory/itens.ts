import { ItemCreateDto, ItemUpdateDto } from "@/domain/dto/itens/ItensDto";
import { IItemsRepository } from "../interfaces/index";
import { Item, StatusCart, statusItem } from "@prisma/client";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { ItemEntity } from "@/domain/model";

class InMemoryItensRepository implements IItemsRepository {
  listActiveItemById!: (itemId: string) => Promise<Partial<ItemEntity | null>>;
  itensDb: Partial<Item>[] = [];

  create = async (dto: ItemCreateDto) => {
    const item: Item = {
      id: randomUUID(),
      nome: dto.name,
      preco: dto.price as unknown as Decimal,
      descricao: dto.description,
      image: dto.image,
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
      disponivel: dto.available,
      tamanho: dto.size,
    };

    this.itensDb.push(item);
    return item;
  };

  listById = async (id: string) => {
    const item = this.itensDb.find((i) => i.id === id);
    return item ?? null;
  };

  listAll = async () => {
    const items = this.itensDb;

    return items;
  };

  update = async (data: ItemUpdateDto, itemId: string) => {
    const findItem = this.itensDb.find((item) => item.id === itemId)!;

    findItem.descricao = data.description;
    findItem.image = data.image;
    findItem.preco = data.price;
    findItem.disponivel = data.available;
    findItem.dataAtualizacao = new Date();
    return findItem;
  };

  listActiveItens = async () => {
    const activeItem = this.itensDb.filter((item) => item.disponivel === StatusCart.ATIVO);

    return activeItem;
  };

  inactiveItem = async (idItem: string) => {
    const findItem = this.itensDb.find((item) => item.id === idItem)!;
    findItem.disponivel = statusItem.INATIVO;
    return findItem;
  };
}

export { InMemoryItensRepository };
