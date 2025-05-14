import { statusItem } from "@prisma/client";
import { z } from "zod";

const itemCreateBodySchema = z.object({
  nome: z.string().min(1, "O nome do item é obrigatório"),
  preco: z.coerce.number().min(1, "O preço do item é obrigatório"),
  descricao: z.string().min(1, "A descrião do item é obrigatório"),
  image: z.string(),
  disponivel: z.nativeEnum(statusItem).default(statusItem.ATIVO),
});

const itemUpdateBodySchema = z.object({
  nome: z.string().optional(),
  preco: z.coerce.number().optional(),
  descricao: z.string().optional(),
  image: z.string().optional(),
  disponivel: z.nativeEnum(statusItem).optional(),
});

type ItemCreateDto = z.infer<typeof itemCreateBodySchema>;
type ItemUpdateDto = z.infer<typeof itemUpdateBodySchema>;

export { itemCreateBodySchema, ItemCreateDto, itemUpdateBodySchema, ItemUpdateDto };
