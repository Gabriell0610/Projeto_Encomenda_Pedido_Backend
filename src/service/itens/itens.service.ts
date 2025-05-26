import { ItemCreateDto, ItemUpdateDto } from "@/domain/dto/itens/ItensDto";
import { IItensService } from "./IItemsService.type";
import { IItemsRepository } from "@/repository/interfaces";
import { BadRequestException } from "@/shared/error/exceptions/bad-request-exception";

class ItensService implements IItensService {
  constructor(private itensRepository: IItemsRepository) {}

  create = async (dto: ItemCreateDto) => {
    const data = await this.itensRepository.create(dto);

    if (!data) {
      throw new BadRequestException("Erro ao criar item");
    }

    return data;
  };

  update = async (dto: ItemUpdateDto, itemId: string) => {
    await this.verifyItemExist(itemId);

    const updatedItem = await this.itensRepository.update(dto, itemId);

    return updatedItem;
  };

  listAll = async () => {
    const data = await this.itensRepository.listAll();
    return data;
  };

  listActiveItens = async () => {
    const data = await this.itensRepository.listActiveItens();
    return data;
  };

  inactiveItem = async (itemId: string) => {
    await this.verifyItemExist(itemId);
    return await this.itensRepository.inactiveItem(itemId);
  };

  private verifyItemExist = async (itemId: string) => {
    const itemExists = await this.itensRepository.listById(itemId);

    if (!itemExists) {
      throw new BadRequestException("Item não encontrado!");
    }

    return itemExists;
  };
}

export { ItensService };
