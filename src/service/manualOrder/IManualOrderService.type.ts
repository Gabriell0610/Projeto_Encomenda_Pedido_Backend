import { ManualOrderDto, UpdateManualOrderDto } from "@/domain/dto/manualOrder/ManualOrder";
import { ManualOrderAndItemEntity } from "@/domain/model/manualOrderEntity";
import { status } from "@prisma/client";

interface IManualOrderService {
  listAllManualOrder:() => Promise<Partial<ManualOrderAndItemEntity>[]>
  createManualOrder: (dto: ManualOrderDto) => Promise<Partial<ManualOrderAndItemEntity>>
  changeStatusOrder:(id: string, status: status, mode?: string) => Promise<{id: string}>
  updateManualOrder:(id: string, dto: UpdateManualOrderDto) => Promise<{id: string}>
  removeItemManualOrder:(id: string) => Promise<void>
}

export { IManualOrderService };
