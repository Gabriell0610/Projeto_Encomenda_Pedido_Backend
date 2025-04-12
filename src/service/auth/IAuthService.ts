import { authDto } from "../../dto/auth/LoginDto";
import { CreateUserDto } from "../../dto/auth/CreateUserDto";
import { Usuario } from "@prisma/client";
import { ForgotPasswordDto } from "@/dto/auth/ForgotPasswordDto";

interface IAuthService {
  login: (dto: authDto) => Promise<String>;
  register: (data: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
  forgetPassword: (dto: ForgotPasswordDto) => Promise<string>;
}

export { IAuthService };
