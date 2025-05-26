import {ManualOrderAndItemEntity, ManualOrderWithItems } from "@/domain/model/manualOrderEntity";
import { status } from "@prisma/client";
import { ManualOrderDto, UpdateManualOrderDto } from "@/domain/dto/manualOrder/ManualOrder";


interface IManualOrderRepository {
  listAllManualOrder:() => Promise<Partial<ManualOrderAndItemEntity>[]>
  changeStatusOrder: (id: string, status: status, mode?: string) => Promise<{id: string}>
  createManualOrder: (dto: ManualOrderDto) => Promise<Partial<ManualOrderAndItemEntity>>
  findManualOrderById:(id: string) => Promise<Partial<ManualOrderWithItems | null>>
  updateManualOrder: (id: string, dto: UpdateManualOrderDto) => Promise<{id: string}>
  removeItemManualOrder: (id: string) => Promise<void>
}
export { IManualOrderRepository };
