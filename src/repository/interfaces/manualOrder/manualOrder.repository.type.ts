import { ManualOrderDto } from "@/domain/dto/manualOrder/ManualOrder";
import { PedidoManual } from "@prisma/client";

interface IManualOrderRepository {
    createOrder: (dto: ManualOrderDto) => Promise<Partial<PedidoManual>>;
}

export {IManualOrderRepository}