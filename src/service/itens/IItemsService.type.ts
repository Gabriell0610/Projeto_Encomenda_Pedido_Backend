import { ItemCreateDto, ItemUpdateDto } from "@/domain/dto/itens/ItensDto";
import { ItemEntity } from "@/domain/model";

type ItemWithRealWeight = Partial<ItemEntity> & {
  pesoReal: string;
};

interface IItensService {
  create: (data: ItemCreateDto) => Promise<Partial<ItemEntity>>;
  update: (data: ItemUpdateDto, itemId: string) => Promise<Partial<ItemEntity>>;
  listAll: () => Promise<Partial<ItemEntity>[]>;
  inactiveItem: (itemId: string) => Promise<Partial<ItemEntity>>;
  listActiveItens: () => Promise<ItemWithRealWeight[]>;
  listActiveItemById: (itemId: string) => Promise<ItemWithRealWeight>;
}

export { IItensService };
