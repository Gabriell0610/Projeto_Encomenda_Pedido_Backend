import { ItemCreateDto, ItemUpdateDto } from "@/domain/dto/itens/ItensDto";
import { ItemEntity } from "@/domain/model";

interface IItensService {
  create: (data: ItemCreateDto) => Promise<ItemEntity>;
  update: (data: ItemUpdateDto, itemId: string) => Promise<Partial<ItemEntity>>;
  listAll: () => Promise<Partial<ItemEntity>[]>;
  inactiveItem: (itemId: string) => Promise<Partial<ItemEntity>>;
  listActiveItens: () => Promise<ItemEntity[]>;
}

export { IItensService };
