import { ManualOrderDto } from "@/domain/dto/manualOrder/ManualOrder";
import { prisma } from "@/libs/prisma";
import { IManualOrderRepository } from "@/repository/interfaces";

class ManualOrderRepository implements IManualOrderRepository {
    createOrder = async (dto: ManualOrderDto) =>  {
        return await prisma.pedidoManual.create({
            data: {
                telefoneCliente: dto.cellphoneClient,
                enderecoCliente: dto.addressClient,
                nomeCliente: dto.clientName,
                pedidoManualItem: {
                    create: dto.items.map(item => ({
                        quantidade: item.quantity,
                        itemId: item.itemId,
                        precoUnitario: 0
                    }))
                }

            }
        })
    }

}

export { ManualOrderRepository }