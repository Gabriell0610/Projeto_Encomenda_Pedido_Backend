import { StatusCart } from "@prisma/client";
import { z } from "zod";


const createCartSchema = z.object({
    userId: z.string(),
    status: z.nativeEnum(StatusCart).default(StatusCart.ATIVO),
    itemId: z.string(),
    quantity: z.number().default(1),
})

const createCartItemSchema = z.object({
    itemId: z.string(),
    quantity: z.number().default(1),
    cartId: z.string(),
})

type CreateCartDto = z.infer<typeof createCartSchema>
type CreateCartItemDto = z.infer<typeof createCartItemSchema>

export { createCartSchema, createCartItemSchema, CreateCartDto, CreateCartItemDto }