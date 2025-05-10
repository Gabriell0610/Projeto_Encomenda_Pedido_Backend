import { HttpStatus } from "@/core/http";
import { orderSchema } from "@/dto/order/OrderDto";
import { IOrderService } from "@/service/order/IOrderService.type";
import { NextFunction, Request, Response } from "express";

class OrderController {
  constructor(private oderService: IOrderService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = orderSchema.parse(req.body);
      const order = await this.oderService.createOrder(dto);
      return res.status(HttpStatus.CREATED).json({ message: "Pedido feito com sucesso!", data: order });
    } catch (error) {
      next(error);
    }
  };
}

export { OrderController };
