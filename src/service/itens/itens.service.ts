import { ItemCreateDto, ItemUpdateDto } from "@/domain/dto/itens/ItensDto";
import { IItensService } from "./IItemsService.type";
import { IItemsRepository } from "@/repository/interfaces";
import { BadRequestException } from "@/shared/error/exceptions/badRequest-exception";
import { SizeItemDescription } from "@/shared/constants/itemSize";

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
    const formatData = data.map((value) => {
      if (!value.tamanho) throw new BadRequestException("Tamanho não definido para item ativo");
      return {
        ...value,
        pesoReal: SizeItemDescription[value.tamanho],
      };
    });
    return formatData;
  };

  inactiveItem = async (itemId: string) => {
    await this.verifyItemExist(itemId);
    return await this.itensRepository.inactiveItem(itemId);
  };

  listActiveItemById = async (itemId: string) => {
    const data = await this.itensRepository.listActiveItemById(itemId);
    if (!data) throw new BadRequestException("Item não encontrado");
    if (!data.tamanho) throw new BadRequestException("Tamanho não definido para item ativo");
    const response = {
      ...data,
      pesoReal: SizeItemDescription[data.tamanho],
    };

    return response;
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
