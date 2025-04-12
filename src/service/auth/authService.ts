import { authDto } from "../../dto/auth/LoginDto";
import { IAuthService } from "./IAuthService";
import { BadRequestException } from "../../core/error/exceptions/bad-request-exception";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import "dotenv/config";
import { CreateUserDto } from "../../dto/auth/CreateUserDto";
import { IUserRepository } from "../../repository/interfaces";
import { ForgotPasswordDto } from "@/dto/auth/ForgotPasswordDto";
import { sendResetPasswordEmail } from "../mail/MailService";
import { generateTokenAuth } from "@/utils/generateToken";

class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}
  forgetPassword!: (dto: ForgotPasswordDto) => Promise<string>;

  register = async (data: CreateUserDto) => {
    const userExists = await this.userRepository.userExistsByEmail(data.email);

    if (userExists) {
      throw new BadRequestException("Já existe conta cadastrada com esse email!");
    }

    const hashedPassword = await bcrypt.hash(data.senha, 8);

    data.senha = hashedPassword;

    return this.userRepository.create(data);
  };

  login = async (dto: authDto) => {
    const userExits = await this.userRepository.userExistsByEmail(dto.email);
    console.log(userExits)

    if (!userExits) {
      throw new BadRequestException("Esse usuário não existe");
    }

    const passwordCorrect = await bcrypt.compare(dto.password, userExits.senha as string);

    if (!passwordCorrect) {
      throw new BadRequestException("Email ou senha incorretos");
    }

    const token = sign(
      {
        id: userExits.id,
        email: userExits.email,
        role: userExits.role,
      },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: "1d", algorithm: "HS256" },
    );

    return token;
  };

  // forgetPassword = async (data: ForgotPasswordDto) => {
  //   const userExists = this.userRepository.userExistsByEmail(data.email)

  //   if(!userExists) {
  //     throw new BadRequestException("Esse usuário não foi encontrado!")
  //   }

  //   const token = generateTokenAuth()
  //   //SALVAR TOKEN E ID DO USUÁRIO NA TABELA tokenResets

  //   /*    */
    
  //   //ENVIAR EMAIL PARA O USUÁRIO COM O TOKEN ACIMA
  //   //sendResetPasswordEmail()
  // }
}

export { AuthService };
