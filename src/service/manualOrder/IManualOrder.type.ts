import { ManualOrderDto } from "@/domain/dto/manualOrder/ManualOrder";
import { PedidoManual } from "@prisma/client";

interface IManualOrderService {
    createOrder: (dto: ManualOrderDto) => Promise<Partial<PedidoManual>>;
}

export {IManualOrderService}