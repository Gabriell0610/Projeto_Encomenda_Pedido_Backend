import { statusItem } from "@prisma/client";
import { z } from "zod";

const itemCreateBodySchema = z.object({
  name: z.string().min(1, "O nome do item é obrigatório"),
  price: z.coerce.number().min(1, "O preço do item é obrigatório"),
  description: z.string().min(1, "A descrião do item é obrigatório"),
  image: z.string(),
  disponible: z.nativeEnum(statusItem).default(statusItem.ATIVO),
});

const itemUpdateBodySchema = z.object({
  name: z.string().optional(),
  price: z.coerce.number().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  disponible: z.nativeEnum(statusItem).optional(),
});

type ItemCreateDto = z.infer<typeof itemCreateBodySchema>;
type ItemUpdateDto = z.infer<typeof itemUpdateBodySchema>;

export { itemCreateBodySchema, ItemCreateDto, itemUpdateBodySchema, ItemUpdateDto };
