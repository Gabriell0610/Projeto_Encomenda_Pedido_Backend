import { ItemCreateDto, ItemUpdateDto } from "@/domain/dto/itens/ItensDto";
import { IItemsRepository } from "../interfaces/index";
import { Item } from "@prisma/client";

class InMemoryItensRepository implements IItemsRepository {
  itensDb: ItemCreateDto[] = [];

  create!: (data: ItemCreateDto) => Promise<Item>;
  update!: (data: ItemUpdateDto, itemId: string) => Promise<Partial<Item>>;
  listAll!: () => Promise<Partial<Item>[]>;
  listById!: (id: string) => Promise<Item | null>;
  inactiveItem!: (idItem: string) => Promise<Partial<Item>>;
  listActiveItens!: () => Promise<Item[]>;
}

export { InMemoryItensRepository };
