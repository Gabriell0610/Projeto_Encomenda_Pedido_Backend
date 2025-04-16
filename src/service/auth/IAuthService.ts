import { authDto } from "../../dto/auth/LoginDto";
import { CreateUserDto } from "../../dto/auth/CreateUserDto";
import { tokenResets, Usuario } from "@prisma/client";
import { ForgotPasswordDto } from "@/dto/auth/ForgotPasswordDto";

interface IAuthService {
  login: (dto: authDto) => Promise<string>;
  register: (data: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
  forgetPassword: (dto: ForgotPasswordDto) => Promise<void>;
  validateToken: (token: string, email: string) => Promise<tokenResets>;
}

export { IAuthService };
