import { ItemCreateDto, ItemUpdateDto } from "../../../dto/itens/ItensDto";
import { Item } from "@prisma/client";

interface IItensRepository {
  create: (data: ItemCreateDto) => Promise<Item>;
  update: (data: ItemUpdateDto, itemId: string) => Promise<Partial<Item>>;
  listAll: () => Promise<Partial<Item>[]>;
  listById: (id: string) => Promise<Item | null>;
  inactiveItem: (idItem: string) => Promise<Partial<Item>>;
  listActiveItens: () => Promise<Item[]>
}

export { IItensRepository };
