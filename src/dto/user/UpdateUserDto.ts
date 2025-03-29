import { z } from "zod";

const updateUserBodySchema = z.object({
  nome: z.string().optional(),
  telefone: z.string().optional(),
});

type UpdateUserDto = z.infer<typeof updateUserBodySchema>;

export { updateUserBodySchema, UpdateUserDto };
