import { IItensRepository } from "@/repository/interface";
import { IItensService } from "./itensService.type";
import { ItensDto } from "@/dto/itens/itensDto";
import { InMemoryItensRepository } from "@/repository/in-memory/itens";
import { ItensRepository } from "@/repository/prisma/itens/itens.prisma.repository";

class ItensService implements IItensService {
  constructor(private itensRepository: ItensRepository) {}

  create = async (data: ItensDto) => {
    return await this.itensRepository.create(data);
  };

  list = async () => {
    const data = await this.itensRepository.list();
    return data;
  };
}

export { ItensService };
