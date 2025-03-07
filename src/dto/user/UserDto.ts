import { AccessProfile } from "../../constants/access-profile";
import { z } from "zod";
import { addressSchema } from "./AddressDto";

//SCHEMAS
const CreateUserSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email escrito de forma errada").min(1, "Email é obrigatório"),
  senha: z.string().min(8, "A senha possui menos de 8 caracteres").min(1, "A Senha é obrigatório"),
  telefone: z.string().min(11, "O telefone possui menos de 21 caracteres").min(1, "O telefone é obrigatório"),
  role: z.enum([AccessProfile.ADMIN, AccessProfile.CLIENT]).default(AccessProfile.CLIENT),
  endereco: z.array(addressSchema),
});

const ListUserDtoSchema = z.object({
  id: z.string(),
  nome: z.string().nullable(),
  email: z.string().nullable(),
  telefone: z.string().nullable(),
  role: z.enum([AccessProfile.ADMIN, AccessProfile.CLIENT]),
  endereco: z.array(addressSchema).optional(),
});

//DTO
type ListUserDto = z.infer<typeof ListUserDtoSchema>;
type CreateUserDto = z.infer<typeof CreateUserSchema>;

export { CreateUserDto, CreateUserSchema, ListUserDto };
