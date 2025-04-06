import { passwordValidation } from "../../helpers/zod/validations/password";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Email escrito de forma errada").min(1, "Email é obrigatório"),
  password: passwordValidation
});

type authDto = z.infer<typeof authSchema>;

export { authSchema, authDto };
