import { manualOrderSchema } from "@/domain/dto/manualOrder/ManualOrder";
import { IManualOrderService } from "@/service/manualOrder/IManualOrder.type";
import { HttpStatus } from "@/shared/constants";
import { Response, Request, NextFunction } from "express";


class ManualOrderController {

    constructor(private manuelOrder: IManualOrderService) {}

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            //const {requesterRole} = authorizationBodySchema.parse(req.body)
            const dto = manualOrderSchema.parse(req.body)
            const payload = await this.manuelOrder.createOrder(dto)
            res.status(HttpStatus.CREATED).json({message: "Pedido criado com sucesso!", data: payload})
        } catch (error) {
            next(error);
        }
    }
}

export {ManualOrderController}