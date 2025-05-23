import { ManualOrderDto } from "@/domain/dto/manualOrder/ManualOrder";
import { IManualOrderService } from "./IManualOrder.type";
import { IManualOrderRepository } from "@/repository/interfaces/manualOrder/manualOrder.repository.type";


class ManualOrderService implements IManualOrderService {

    constructor(private manualOrderRepository: IManualOrderRepository) {}

    createOrder = async (dto: ManualOrderDto) =>  {
        
        const data = await this.manualOrderRepository.createOrder(dto);

        return data
    }

}

export { ManualOrderService };