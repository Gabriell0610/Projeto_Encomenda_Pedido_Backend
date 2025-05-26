import { changeStatusSchema, manualOrderSchema, updateManualOrderSchema } from "@/domain/dto/manualOrder/ManualOrder";
import { IManualOrderService } from "@/service/manualOrder/IManualOrderService.type";
import { HttpStatus } from "@/shared/constants";
import { NextFunction, Request, Response } from "express";

class ManualOrderController {
  constructor(private manualOrderService: IManualOrderService) {}

  lisAllManualOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = await this.manualOrderService.listAllManualOrder();
      res.status(HttpStatus.OK).json({ message: "Listando pedidos manuais", data: payload });
    } catch (error) {
      next(error);
    }
  };

  createManualOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = manualOrderSchema.parse(req.body);
      const payload = await this.manualOrderService.createManualOrder(dto);
      res.status(HttpStatus.CREATED).json({ message: "Pedido manual criado com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };

  changeStatusManualOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = changeStatusSchema.parse(req.body);
      const payload = await this.manualOrderService.changeStatusOrder(id, status);
      res.status(HttpStatus.OK).json({ message: "Status do pedido alterado com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };

  cancelManualOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { status } = changeStatusSchema.parse(req.body);
      const payload = await this.manualOrderService.changeStatusOrder(id, status, "cancel");
      res.status(HttpStatus.OK).json({ message: "Pedido Cancelado", data: payload });
    } catch (error) {
      next(error);
    }
  };

  updateManualOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const dto = updateManualOrderSchema.parse(req.body);
      const payload = await this.manualOrderService.updateManualOrder(id, dto);
      res.status(HttpStatus.OK).json({ message: "Pedido manual atualizado com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };

  removeItemManualOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this.manualOrderService.removeItemManualOrder(id);
      res.status(HttpStatus.OK).json({ message: "Item removido com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}

export { ManualOrderController };
