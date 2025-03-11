import { z } from "zod";
import { updateAddressBodySchema } from "./AddressDto";

const updateUserBodySchema = z.object({
  nome: z.string().optional(),
  telefone: z.string().optional(),
  endereco: z.array(updateAddressBodySchema).optional(),
});

type UpdateUserDto = z.infer<typeof updateUserBodySchema>;

export { updateUserBodySchema, UpdateUserDto };
