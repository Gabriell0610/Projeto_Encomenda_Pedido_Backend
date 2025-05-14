import { StatusCart } from "@prisma/client";
import { z } from "zod";

const createCartSchema = z.object({
  userId: z.string(),
  status: z.nativeEnum(StatusCart).default(StatusCart.ATIVO),
  itemId: z.string(),
  quantity: z.number().default(1),
});

type CreateCartDto = z.infer<typeof createCartSchema>;

export { createCartSchema, CreateCartDto };
