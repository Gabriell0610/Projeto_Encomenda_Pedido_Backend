import { AccessProfile } from "../../../shared/constants/accessProfile";
import { z } from "zod";
import { passwordValidation } from "@/utils/zod/validations/password";
import { cellphoneValidaton } from "@/utils/zod/validations/cellphone";

//SCHEMAS
const CreateUserBodySchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().email("Email escrito de forma errada").min(1, "Email é obrigatório"),
  password: passwordValidation,
  cellphone: cellphoneValidaton,
  role: z.nativeEnum(AccessProfile).default(AccessProfile.CLIENT),
});

type CreateUserDto = z.infer<typeof CreateUserBodySchema>;

export { CreateUserDto, CreateUserBodySchema };
