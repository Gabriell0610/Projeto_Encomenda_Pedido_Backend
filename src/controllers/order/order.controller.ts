import { HttpStatus } from "@/shared/constants/index";
import { orderSchema, updateOrderSchema } from "@/domain/dto/order/OrderDto";
import { IOrderService } from "@/service/order/IOrderService.type";
import { uuidSchema } from "@/utils/zod/schemas/id";
import { NextFunction, Request, Response } from "express";

class OrderController {
  constructor(private oderService: IOrderService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = orderSchema.parse(req.body);
      const payload = await this.oderService.createOrder(dto);
      res.status(HttpStatus.CREATED).json({ message: "Pedido criado com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = uuidSchema.parse(req.params);
      const dto = updateOrderSchema.parse(req.body);
      const payload = await this.oderService.updateOrder(id, dto);
      res.status(HttpStatus.OK).json({ message: "Pedido atualizado com sucesso!", data: payload });
    } catch (error) {
      next(error);
    }
  };

  cancelOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = uuidSchema.parse(req.params);
      const payload = await this.oderService.cancelOrder(id);
      res.status(HttpStatus.OK).json({ message: "Pedido cancelado com suceso", data: payload });
    } catch (error) {
      next(error);
    }
  };

  listOrderByClientId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: idClient } = uuidSchema.parse(req.params);
      const payload = await this.oderService.listOrdersByClientId(idClient);
      res.status(HttpStatus.OK).json({ message: "Pedidos do cliente listados com sucesso", data: payload });
    } catch (error) {
      next(error);
    }
  };

  listAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = await this.oderService.listAllOrders();
      res.status(HttpStatus.OK).json({ message: "Todos os pedidos listados com sucesso", data: payload });
    } catch (error) {
      next(error);
    }
  };

  listOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = uuidSchema.parse(req.params);
      const payload = await this.oderService.listOrderById(id);
      res.status(HttpStatus.OK).json({ message: "Pedido listado com sucesso", data: payload });
    } catch (error) {
      next(error);
    }
  };
}

export { OrderController };
