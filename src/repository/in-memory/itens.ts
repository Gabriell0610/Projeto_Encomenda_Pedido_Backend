import { ItensDto } from "@/dto/itens/itensDto";
import { IItensRepository } from "../interface";

class InMemoryItensRepository implements IItensRepository {
  itensDb: ItensDto[] = [];

  create = async (data: ItensDto) => {
    this.itensDb.push(data);
  };

  list = async () => {
    const res = this.itensDb.map((data) => {
      return data;
    });

    return res;
  };
}

export { InMemoryItensRepository };
