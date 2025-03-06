import { cepValidation } from "@/helpers/zod/validations/cep";
import { z } from "zod";

const addressSchema = z.object({
  rua: z.string().min(1, "Rua é obrigatório").nullable(),
  cep: cepValidation.nullable(),
  numero: z.coerce
    .number()
    .transform((value) => String(value))
    .nullable(),
  bairro: z.string().min(1, "O Bairro é obrigatório").nullable(),
  cidade: z.string().min(1, "A Cidade é obrigatória").nullable(),
  estado: z.string().min(2, "O Estado é obrigatório").nullable(),
  complemento: z.string().optional().nullable(),
});

type AddressUserDto = z.infer<typeof addressSchema>;

export { addressSchema, AddressUserDto };
