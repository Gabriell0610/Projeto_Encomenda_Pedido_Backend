import { ItensDto } from "@/dto/itens/itensDto";
import { Item } from "@prisma/client";

interface IItensRepository {
  create: (data: ItensDto) => Promise<void>;
  list: () => Promise<Partial<Item>[]>;
}

export { IItensRepository };
