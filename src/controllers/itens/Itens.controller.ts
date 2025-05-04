import { HttpStatus } from "@/core/http";
import { ItemCreateDto, ItemUpdateDto, itemCreateBodySchema, itemUpdateBodySchema } from "@/dto/itens/ItensDto";
import { IItensService } from "@/service/itens/IItensService";
import { NextFunction, Request } from "express";

class ItensController {
  constructor(private itensService: IItensService) {}

  create = async (req: Request, res: any, next: NextFunction) => {
    try {
      const dto = itemCreateBodySchema.parse(req.body);
      const data = await this.itensService.create(dto);
      return res.status(HttpStatus.CREATED).json({ message: "Item criado com sucesso!", data: data });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: any, next: NextFunction) => {
    try {
      const data = await this.itensService.listAll();
      res.status(HttpStatus.OK).json({ message: "Listando itens", data: data });
    } catch (error) {
      next(error);
    }
  };

  listActiveItens = async (req: Request, res: any, next: NextFunction) => {
    try {
      const data = await this.itensService.listActiveItens();
      res.status(HttpStatus.OK).json({ message: "Listando itens ativos", data: data });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: any, next: NextFunction) => {
    try {
      const dto = itemUpdateBodySchema.parse(req.body);
      const { id: itemId } = req.params;
      const data = await this.itensService.update(dto, itemId);
      return res.status(HttpStatus.CREATED).json({ message: "Item atualizado com sucesso!", data: data });
    } catch (error) {
      next(error);
    }
  };

  inactiveItem = async (req: Request, res: any, next: NextFunction) => {
    try {
      const { id: itemId } = req.params;
      const data = await this.itensService.inactiveItem(itemId);
      return res.status(HttpStatus.OK).json({ message: "Item inativado com sucesso!", data: data });
    } catch (error) {
      next(error);
    }
  };
}

export { ItensController };