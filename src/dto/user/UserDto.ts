import { AccessProfile } from "@/constants/access-profile";
import { z } from "zod";

const CreateUserSchema = z.object({
  nome: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email escrito de forma errada").min(1, "Email obrigatório"),
  senha: z.string().min(8, "A senha possui menos de 8 caracteres").min(1, "A Senha é obrigatória"),
  telefone: z.string().min(11, "O telefone possui menos de 21 caracteres").min(1, "O telefone é obrigatório"),
  role: z.enum([AccessProfile.admin, AccessProfile.client]).default(AccessProfile.client),
});

type CreateUserDto = z.infer<typeof CreateUserSchema>;

export { CreateUserDto, CreateUserSchema };
