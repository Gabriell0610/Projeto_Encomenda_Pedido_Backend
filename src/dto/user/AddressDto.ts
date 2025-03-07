import { cepValidation } from "../../helpers/zod/validations/cep";
import { z } from "zod";

const addressSchema = z.object({
  rua: z.string().min(1, "Rua é obrigatório"),
  cep: cepValidation,
  numero: z.coerce.number().transform((value) => String(value)),
  bairro: z.string().min(1, "O Bairro é obrigatório"),
  cidade: z.string().min(1, "A Cidade é obrigatória"),
  estado: z.string().min(2, "O Estado é obrigatório"),
  complemento: z.string().optional().nullable(),
});

type AddressUserDto = z.infer<typeof addressSchema>;

export { addressSchema, AddressUserDto };
