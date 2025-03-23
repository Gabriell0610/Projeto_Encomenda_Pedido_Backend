import { IItensRepository } from "@/repository/interfaces";
import { IItensService } from "./IItensService";
import { ItensDto } from "@/dto/itens/itensDto";

class ItensService implements IItensService {
  constructor(private itensRepository: IItensRepository) {}

  create = async (data: ItensDto) => {
    return await this.itensRepository.create(data);
  };

  list = async () => {
    const data = await this.itensRepository.list();
    return data;
  };
}

export { ItensService };
