import { authDto } from "../../dto/auth/LoginDto";
import { CreateUserDto } from "../../dto/auth/CreateUserDto";
import { tokenResets, Usuario } from "@prisma/client";
import { ForgotPasswordDto } from "@/dto/auth/ForgotPasswordDto";

interface IAuthService {
  login: (dto: authDto) => Promise<string>;
  register: (data: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
  createToken: (dto: ForgotPasswordDto) => Promise<tokenResets | void>;
  validateToken: (dto: ForgotPasswordDto) => Promise<tokenResets | void>;
  resetPassword: (dto: ForgotPasswordDto) => Promise<void>;
}

export { IAuthService };
