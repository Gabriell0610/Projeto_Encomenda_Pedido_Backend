import { HttpStatus } from "@/core/http";
import { ItemCreateDto, ItemUpdateDto, itemCreateBodySchema, itemUpdateBodySchema } from "@/dto/itens/ItensDto";
import { IItensService } from "@/service/itens/IItensService";
import { NextFunction, Request } from "express";

class ItensController {
  constructor(private itensService: IItensService) {}

  create = async (req: Request, res: any, next: NextFunction) => {
    try {
      const data = itemCreateBodySchema.parse(req.body);
      const payload = await this.itensService.create(data);
      return res.status(HttpStatus.CREATED).json({ message: "Item criado com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };

  list = async (req: Request, res: any, next: NextFunction) => {
    try {
      const payload = await this.itensService.listAll();
      res.status(HttpStatus.OK).json({ message: "Listando itens", data: payload });
    } catch (error) {
      next(error);
    }
  };

  listActiveItens = async (req: Request, res: any, next: NextFunction) => {
    try {
      const payload = await this.itensService.listActiveItens();
      res.status(HttpStatus.OK).json({ message: "Listando itens ativos", data: payload });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: any, next: NextFunction) => {
    try {
      const data = itemUpdateBodySchema.parse(req.body);
      const { id: itemId } = req.params;
      const payload = await this.itensService.update(data, itemId);
      return res.status(HttpStatus.CREATED).json({ message: "Item atualizado com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };

  inactiveItem = async (req: Request, res: any, next: NextFunction) => {
    try {
      const { id: itemId } = req.params;
      const payload = await this.itensService.inactiveItem(itemId);
      return res.status(HttpStatus.OK).json({ message: "Item inativado com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };
}

export { ItensController };