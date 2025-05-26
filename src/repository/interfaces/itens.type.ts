import { ItemCreateDto, ItemUpdateDto } from "@/domain/dto/itens/ItensDto";
import { ItemEntity } from "@/domain/model";

interface IItemsRepository {
  create: (data: ItemCreateDto) => Promise<ItemEntity>;
  update: (data: ItemUpdateDto, itemId: string) => Promise<Partial<ItemEntity>>;
  listAll: () => Promise<Partial<ItemEntity>[]>;
  listById: (id: string) => Promise<ItemEntity | null>;
  inactiveItem: (idItem: string) => Promise<Partial<ItemEntity>>;
  listActiveItens: () => Promise<ItemEntity[]>;
}

export { IItemsRepository };
