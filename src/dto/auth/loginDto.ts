import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Email escrito de forma errada").min(1, "Email é obrigatório"),
  senha: z.string().min(8, "A senha possui menos de 8 caracteres").min(1, "A Senha é obrigatório"),
});

type authDto = z.infer<typeof authSchema>;

export { authSchema, authDto };
