import { HttpStatus } from "@/core/http";
import { orderSchema, updateOrderSchema } from "@/dto/order/OrderDto";
import { IOrderService } from "@/service/order/IOrderService.type";
import { NextFunction, Request, Response } from "express";

class OrderController {
  constructor(private oderService: IOrderService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = orderSchema.parse(req.body);
      const payload = await this.oderService.createOrder(dto);
      res.status(HttpStatus.CREATED).json({ message: "Pedido feito com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const dto = updateOrderSchema.parse(req.body);
      const payload = await this.oderService.updateOrder(id, dto);
      res.status(HttpStatus.OK).json({ message: "Pedido atualizado com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };

  cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const payload = this.oderService.cancelOrder(id);
      res.status(HttpStatus.OK).json({ message: "Pedido cancelado com suceso", data: payload });
    } catch (error) {
      next(error);
    }
  };
}

export { OrderController };
