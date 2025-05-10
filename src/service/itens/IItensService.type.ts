import { ItemCreateDto, ItemUpdateDto } from "@/dto/itens/ItensDto";
import { Item } from "@prisma/client";

interface IItensService {
  create: (data: ItemCreateDto) => Promise<Item>;
  update: (data: ItemUpdateDto, itemId: string) => Promise<Partial<Item>>;
  listAll: () => Promise<Partial<Item>[]>;
  inactiveItem: (itemId: string) => Promise<Partial<Item>>;
  listActiveItens: () => Promise<Item[]>;
}

export { IItensService };
