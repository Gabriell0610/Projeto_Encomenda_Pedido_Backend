import { z } from "zod";


const itemsData = z.object({
    itemId: z.string(),
    quantity: z.number().default(1)
})

const manualOrderSchema = z.object({
  clientName:      z.string().min(1, 'Nome do cliente é obrigatório'),
  cellphoneClient:  z.string().min(1, 'Telefone é obrigatório'),
  addressClient:  z.string().min(1, 'Endereço é obrigatório'),
  items: itemsData.array()
})

type ManualOrderDto = z.infer<typeof manualOrderSchema>


export {manualOrderSchema,ManualOrderDto }